import { all, put, call, takeEvery } from 'redux-saga/effects'
import { FETCH_ITEMS, FETCH_NOTES, FETCH_ITEM_CHILDREN, FETCH_ITEM_NOTES } from '../actions';

const api_root = 'https://personal-dashboard-umbrella-kino6052.c9users.io';

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

const  generateItemTree = (itemJson, itemChildJson) => {
  const ROOT = '5b6605a886ec2e1a5a713867';
  let itemsMap = {}
  let itemChildrenMap = {}
  for (let item of itemJson) {
    let {
      _id
    } = item;
    item.children = [];
    itemsMap[_id] = item;
  }
  for (let itemChild of itemChildJson) {
    let {
      parentId,
      childId
    } = itemChild;
    if (itemChildrenMap[parentId]) {
      itemChildrenMap[parentId] = [...itemChildrenMap[parentId], itemChild.childId];
    } else {
      itemChildrenMap[parentId] = [itemChild.childId]
    }
  }
  let result = [];
  let queue = [ROOT];
  while(queue.length > 0) {
    let currentId = queue.pop();
    let currentNode = itemsMap[currentId];
    let currentChildren = itemChildrenMap[currentId];
    if (currentNode) {
      currentNode.childIds = currentChildren || [];
      currentNode.id = currentNode['_id'];
      itemsMap[currentNode.id] = currentNode;
      if (currentChildren) {
          queue = [...currentChildren, ...queue]
      }
    }
  }
  return itemsMap;
}

export function* fetchItems() {
  console.log('Hello Sagas!')
  let itemJson = yield call(fetchItemsHelper)
  let itemChildJson = yield call(fetchItemChildrenHelper)
  console.log('Generating result');
  let result = yield call(generateItemTree, itemJson, itemChildJson)
  console.log(result)
  yield put({ type: 'SET_TREE', tree: result || []});
}

export async function* fetchItemChildren() {
  console.log('Hello Sagas!')
  // let test = await fetch(`${api_root}/item`)
  // let json = await test.json();
  // console.log(json);
}

export async function* fetchNotes() {
  console.log('Hello Sagas!')
  // let test = await fetch(`${api_root}/item`)
  // let json = await test.json();
  // console.log(json);
}

export async function* fetchItemNotes() {
  console.log('Hello Sagas!')
  // let test = await fetch(`${api_root}/item`)
  // let json = await test.json();
  // console.log(json);
}

export function* fetchItemsWatcher() {
  yield takeEvery(FETCH_ITEMS, fetchItems)
}

export function* fetchItemChildrenWatcher() {
  yield takeEvery(FETCH_ITEM_CHILDREN, fetchItemChildren)
}

export function* fetchNotesWatcher() {
  yield takeEvery(FETCH_NOTES, fetchNotes)
}

export function* fetchItemNotesWatcher() {
  yield takeEvery(FETCH_ITEM_NOTES, fetchItemNotes)
}

export function* init() {
  console.log('here');
  yield put({ type: FETCH_ITEMS });
}

export function* rootSaga() {
  yield all([
    fetchItemsWatcher(),
    fetchItemChildrenWatcher(),
    fetchItemNotesWatcher(),
    fetchNotesWatcher(),
    init()
  ])
}
