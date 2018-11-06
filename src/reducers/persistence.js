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
    parentId,
    name
  } = action;
  let {
    addedItemNodes,
    changedItemNodes,
    removedItemNodes,
    changedNoteNodes,
    addedNoteNodes,
    addedItemChildNodes
  } = state;
  switch (action.type) {
    case SAVE_NAME:
      changedItemNodes = changedItemNodes.filter(id => nodeId !== id) // edge case: duplicates of nodeId
      let isNewNode = nodeId.match(/new/) ? true : false // we only add existing nodes to the changedItemNodes list
      if (!isNewNode) {
        return {
          ...state,
          changedItemNodes: [...changedItemNodes, nodeId]
        }
      }
      return state;

    case DELETE_NODE:
      removedItemNodes = removedItemNodes.filter(id => nodeId !== id) // edge case: duplicates of nodeId
      return {
        ...state,
        removedItemNodes: [...removedItemNodes, nodeId]
      }
    case CREATE_NODE:
      addedItemNodes = addedItemNodes.filter(id => nodeId !== id)
      debugger;
      return {
        ...state,
        addedItemNodes: [...addedItemNodes, nodeId],
        addedItemChildNodes: [...addedItemChildNodes, {parentId, childId: nodeId}]
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
