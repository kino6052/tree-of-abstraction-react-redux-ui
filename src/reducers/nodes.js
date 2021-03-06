import { INCREMENT, ADD_CHILD, REMOVE_CHILD, CREATE_NODE, DELETE_NODE, SAVE_NAME, TOGGLE_COLLAPSE_MANY } from '../actions'

const childIds = (state, action) => {
  switch (action.type) {
    case ADD_CHILD:
      return [ ...state, action.childId ]
    case REMOVE_CHILD:
      return state.filter(id => id !== action.childId)
    default:
      return state
  }
}

const node = (state, action) => {
  switch (action.type) {
    case CREATE_NODE:
      return {
        id: action.nodeId,
        counter: 0,
        childIds: []
      }
    case INCREMENT:
      return {
        ...state,
        counter: state.counter + 1
      }
    case SAVE_NAME:
      return {
        ...state,
        title: action.name
      }
    case ADD_CHILD:
    case REMOVE_CHILD:
      return {
        ...state,
        childIds: childIds(state.childIds, action)
      }
    default:
      return state
  }
}

export const getAllDescendantIds = (state, nodeId) => {
  let {
    childIds = []
  } = state[nodeId] || {};
  let t = childIds.reduce((acc, childId) => {
    return [ ...acc, childId, ...getAllDescendantIds(state, childId) ]
  }, [])
  return [...t, nodeId] || [];
}

const getImmediateDescendantIds = (state, nodeId) => {
  let {
    childIds = []
  } = state[nodeId] || {};
  let t = childIds.reduce((acc, childId) => {
    return [ ...acc, childId ]
  }, [])
  return t || [];
}

const deleteMany = (state, ids) => {
  state = { ...state }
  ids.forEach(id => delete state[id])
  // TODO: Remove from parent ChildIds
  return state
}

const toggleCollapseMany = (state, ids) => {
  state = { ...state }
  ids.forEach(id => {
    let {
      collapsed = false
    } = state[id] || {}
    state[id] = { ...state[id], 'collapsed': !collapsed }
  })
  return state
}

export default (state = {}, action) => {
  const { nodeId, tree, oldNodeId, newNodeId, parentId } = action
  // if (typeof nodeId === 'undefined' && !tree) {
  //   return state
  // }

  if (action.type === DELETE_NODE) {
    let descendantIds = getAllDescendantIds(state, nodeId)
    // TODO: Add to persistence
    return deleteMany(state, [ nodeId, ...descendantIds ])
  }

  if (action.type === TOGGLE_COLLAPSE_MANY) {
    let descendantIds = getImmediateDescendantIds(state, nodeId) || []
    return toggleCollapseMany(state, descendantIds)
  }

  if (action.type === 'UPDATE_ID') {
    let newState = {...state};
    for (let id in newState) {
      if (id === oldNodeId) { // changing node
        let oldNode = newState[id]
        oldNode.id = newNodeId
        delete newState[id];
        newState[newNodeId] = oldNode;
      }
      if (id === parentId) { // updating parent node children
        newState[parentId].childIds = newState[parentId].childIds.filter(childId => childId !== oldNodeId);
        newState[parentId].childIds.push(newNodeId);
      }
    }
    return newState;
  }

  if (action.type === 'SET_TREE') {
    return tree;
  }
  return {
    ...state,
    [nodeId]: node(state[nodeId], action)
  }
}
