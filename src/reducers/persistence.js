import { CREATE_NODE, DELETE_NODE, SAVE_NAME } from '../actions'

const DEFAULT = {
  addedNodes: [],
  changedNodes: [],
  removedNodes: []
}

export default (state = DEFAULT, action) => {
  let {
    nodeId,
    name
  } = action;
  let {
    addedNodes,
    changedNodes,
    removedNodes
  } = state;
  switch (action.type) {
    case SAVE_NAME:
      addedNodes = addedNodes.filter(id => nodeId !== id) // edge case: duplicates of nodeId
      return {
        ...state,
        changedNodes: [...state.changedNodes, nodeId]
      }
    case DELETE_NODE:
      removedNodes = removedNodes.filter(id => nodeId !== id) // edge case: duplicates of nodeId
      return {
        ...state,
        removedNodes: [...state.removedNodes, nodeId]
      }
    case CREATE_NODE:
      addedNodes = addedNodes.filter(id => nodeId !== id) // edge case: duplicates of nodeId
      return {
        ...state,
        addedNodes: [...state.addedNodes, nodeId]
      }
    default:
      return state;
  }
}
