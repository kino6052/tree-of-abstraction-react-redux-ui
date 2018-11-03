import { CREATE_NODE, DELETE_NODE, SAVE_NAME, SAVE_NOTE } from '../actions'

const DEFAULT = {
  addedItemNodes: [],
  changedItemNodes: [],
  addedItemChildNodes: [],
  addedNoteNodes: [],
  changedNoteNodes: [],
  addedItemNoteNodes: []
}

export default (state = DEFAULT, action) => {
  let {
    nodeId,
    noteId,
    name
  } = action;
  let {
    addedItemNodes,
    changedItemNodes,
    removedItemNodes,
    changedNoteNodes,
    addedNoteNodes
  } = state;
  console.log('Persistence');
  switch (action.type) {
    case SAVE_NAME:
      changedItemNodes = changedItemNodes.filter(id => nodeId !== id) // edge case: duplicates of nodeId
      return {
        ...state,
        changedItemNodes: [...changedItemNodes, nodeId]
      }
    case DELETE_NODE:
      removedItemNodes = removedItemNodes.filter(id => nodeId !== id) // edge case: duplicates of nodeId
      return {
        ...state,
        removedItemNodes: [...removedItemNodes, nodeId]
      }
    case CREATE_NODE:
      addedItemNodes = addedItemNodes.filter(id => nodeId !== id) // edge case: duplicates of nodeId
      return {
        ...state,
        addedItemNodes: [...addedItemNodes, nodeId]
      }
    case SAVE_NOTE:
      debugger;
      changedNoteNodes = changedNoteNodes.filter(id => noteId !== id) // edge case: duplicates of nodeId
      return {
        ...state,
        changedNoteNodes: [...changedNoteNodes, noteId]
      }
    default:
      return state;
  }
}
