import { all, put, call, takeEvery, select } from 'redux-saga/effects'
import { FETCH_ITEMS, FETCH_NOTES, FETCH_ITEM_CHILDREN, FETCH_ITEM_NOTES, SAVE_NAME } from '../actions';
import {changed_nodes_selector, added_nodes_selector, nodes_selector, added_item_child_selector} from '../selectors/node.js'
import {changed_notes_selector, added_notes_selector} from '../selectors/note.js'

const api_root = 'https://personal-dashboard-umbrella-kino6052.c9users.io';

const augmentedFetch = (method, data) => {
  return fetch(`${api_root}/item`, {
    method: method,
    body: JSON.stringify(data),
    headers: {
        "Content-Type": "application/json; charset=utf-8",
    }
  })
}

const fetchItemsHelper = async () => {
  let itemResponse = await fetch(`${api_root}/item`);
  let json = await itemResponse.json();
  return json;
}

const fetchItemChildrenHelper = async () => {
  let itemChildrenResponse = await fetch(`${api_root}/item-child`);
  let json = await itemChildrenResponse.json();
  return json;
}

const fetchNotesHelper = async () => {
  let noteResponse = await fetch(`${api_root}/note`);
  let json = await noteResponse.json();
  return json;
}

const fetchItemNotesHelper = async () => {
  let itemNoteResponse = await fetch(`${api_root}/item-note`);
  let json = await itemNoteResponse.json();
  return json;
}

const  generateItemTree = (itemJson, itemChildJson) => {
  const ROOT = '5b6605a886ec2e1a5a713867';
  let itemsMap = {}
  let itemChildrenMap = {}
  for (let item of itemJson) {
    let {
      _id,
      children
    } = item;
    itemsMap[_id] = item;
    itemChildrenMap[_id] = children;
  }
  // for (let itemChild of itemChildJson) {
  //   let {
  //     parentId,
  //     childId
  //   } = itemChild;
  //   if (itemChildrenMap[parentId]) {
  //     itemChildrenMap[parentId] = [...itemChildrenMap[parentId], itemChild.childId];
  //   } else {
  //     itemChildrenMap[parentId] = [itemChild.childId]
  //   }
  // }
  let result = [];
  let queue = [ROOT];
  while(queue.length > 0) {
    let currentId = queue.pop();
    let currentNode = itemsMap[currentId];
    let currentChildren = itemChildrenMap[currentId];
    if (currentNode) {
      currentNode.childIds = currentChildren || [];
      currentNode.id = currentNode['_id'];
      currentNode.parentId = currentNode['_id'];
      currentNode.collapsed = true;
      itemsMap[currentNode.id] = currentNode;
      if (currentChildren) {
          queue = [...currentChildren, ...queue]
      }
    }
  }
  return itemsMap;
}

const generateNotes = (noteJson, itemNoteJson) => {
  let result = [];
  let noteJsonMap = noteJson.reduce(
    (acc, note)=>{
      let { _id } = note;
      acc[_id] = note;
      return acc;
    },
    {}
  )
  for (let itemNote of itemNoteJson) {
    let {
      itemId,
      noteId
    } = itemNote;
    let {
      itemIds = []
    } = noteJsonMap[noteId] || {};
    (noteJsonMap[noteId] || {}).itemIds = [...itemIds, itemId];
  }
  for (let noteJsonId in noteJsonMap) {
    result.push(noteJsonMap[noteJsonId]);
  }
  return result;
}

export function* fetchItems() {
  let itemJson = null;
  let itemChildJson = null;
  try {
    itemJson = yield call(fetchItemsHelper)
    itemChildJson = yield call(fetchItemChildrenHelper)
  } catch (e) {
    console.warn(e);
    console.log('Couldn\'t get item data')
  }
  if (itemJson && itemChildJson) {
    console.log('Generating result');
    let result = yield call(generateItemTree, itemJson, itemChildJson)
    yield put({ type: 'SET_TREE', tree: result || []});
    yield put({ type: 'SET_ITEM_CHILDREN', itemChildren: itemChildJson });
    yield put({ type: 'FETCH_NOTES'});
  }
}

export function* fetchNotes() {
  let noteJson = null;
  let itemNoteJson = null;
  try {
    noteJson = yield call(fetchNotesHelper)
    itemNoteJson = yield call(fetchItemNotesHelper)
  } catch (e) {
    console.warn(e);
    console.log('Couldn\'t get note data')
  }
  if (noteJson && itemNoteJson) {
    let result = yield call(generateNotes, noteJson, itemNoteJson);
    yield put({ type: 'SET_NOTES', notes: result} );
  }
}

export function* saveItemNode(data) {
}

export async function* persistNodes() {
  let nodes = yield select(nodes_selector);
  let changedNodes = yield select(changed_nodes_selector);
  let addedNodes = yield select(added_nodes_selector);
  let itemChildren = yield select(added_item_child_selector);
  console.log(itemChildren)
  for (let nodeId of addedNodes) {
    let node = nodes[nodeId];
    let { id, title } = node;
    let response = await augmentedFetch('POST', { title });
    let json = await response.json();
    let { _id } = json;
    let itemChild = itemChildren.find(itemChild => itemChild.childId === id);
    let { parentId } = itemChild;
    yield put({ type: 'UPDATE_ID', oldNodeId: id, newNodeId: _id, parentId });
  }
  for (let nodeId of changedNodes) {
    console.log(nodes[nodeId]);
  }
}

export function* saveItemNodeWatcher() {
  yield takeEvery(SAVE_NAME, saveItemNode)
}

export function* fetchItemsWatcher() {
  yield takeEvery(FETCH_ITEMS, fetchItems)
}

export function* fetchNotesWatcher() {
  yield takeEvery(FETCH_NOTES, fetchNotes)
}

export function* persistNodesWatcher() {
  yield takeEvery('PERSIST_NODES', persistNodes);
}

export function* hotKeyWatcher() {
  let keys = [];
  let callbacks = {
    '["Alt"]': () => {
    },
    '["Control","Shift","S"]': () => {
      persistNodes();
    }
  }
  document.addEventListener('keydown', (e) => {
    // e.preventDefault();
    let {
      key
    } = e;
    keys = keys.filter(k => key !== k);
    keys.push(key);
    let combination = JSON.stringify(keys);
    // console.log(combination);
    (callbacks[combination] || (() => {}))();
  });
  document. addEventListener('keyup', (e) => {
    let {
      key
    } = e;
    keys = []
  });
}

export function* init() {
  yield put({ type: FETCH_ITEMS });
}

export function* rootSaga() {
  yield all([
    hotKeyWatcher(),
    saveItemNodeWatcher(),
    fetchItemsWatcher(),
    fetchNotesWatcher(),
    persistNodesWatcher(),
    init()
  ])
}
