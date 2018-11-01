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
  console.log('Persistence');
  switch (action.type) {
    case SAVE_NAME:
      changedNodes = changedNodes.filter(id => nodeId !== id) // edge case: duplicates of nodeId
      return {
        ...state,
        changedNodes: [...changedNodes, nodeId]
      }
    case DELETE_NODE:
      removedNodes = removedNodes.filter(id => nodeId !== id) // edge case: duplicates of nodeId
      return {
        ...state,
        removedNodes: [...removedNodes, nodeId]
      }
    case CREATE_NODE:
      addedNodes = addedNodes.filter(id => nodeId !== id) // edge case: duplicates of nodeId
      return {
        ...state,
        addedNodes: [...addedNodes, nodeId]
      }
    default:
      return state;
  }
}
