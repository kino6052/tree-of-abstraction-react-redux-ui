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
        name: action.name
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

const getAllDescendantIds = (state, nodeId) => {
  let {
    childIds = []
  } = state[nodeId] || {};
  let t = childIds.reduce((acc, childId) => {
    return [ ...acc, childId, ...getAllDescendantIds(state, childId) ]
  }, [])
  return t || [];
}

const deleteMany = (state, ids) => {
  state = { ...state }
  ids.forEach(id => delete state[id])
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
  const { nodeId, tree } = action
  if (typeof nodeId === 'undefined' && !tree) {
    return state
  }

  if (action.type === DELETE_NODE) {
    let descendantIds = getAllDescendantIds(state, nodeId)
    return deleteMany(state, [ nodeId, ...descendantIds ])
  }

  if (action.type === TOGGLE_COLLAPSE_MANY) {
    let descendantIds = getAllDescendantIds(state, nodeId) || []
    return toggleCollapseMany(state, descendantIds)
  }

  if (action.type === 'SET_TREE') {
    return tree;
  }

  return {
    ...state,
    [nodeId]: node(state[nodeId], action)
  }
}
