import { CREATE_NODE, DELETE_NODE, SAVE_NAME, SAVE_NOTE, CLEAR_PERSISTENCE } from '../actions'

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
  let changedItemsSet;
  let removedItemsSet;
  switch (action.type) {
    case DELETE_NODE:
      removedItemsSet = new Set(removedItemNodes);
      changedItemsSet = new Set(changedItemNodes);
      removedItemsSet.add(nodeId);
      changedItemsSet.add(parentId);
      return {
        ...state,
        removedItemNodes: Array.from(removedItemsSet),
        changedItemNodes: Array.from(changedItemsSet)
      };
    case SAVE_NAME:
    case CREATE_NODE:
      changedItemsSet = new Set(changedItemNodes);
      if (parentId) {
        changedItemsSet.add(parentId); 
      }
      changedItemsSet.add(nodeId);
      return {
        ...state,
        changedItemNodes: Array.from(changedItemsSet)
      };
    case SAVE_NOTE:
      changedNoteNodes = changedNoteNodes.filter(id => noteId !== id) // edge case: duplicates of nodeId
      return {
        ...state,
        changedNoteNodes: [...changedNoteNodes, noteId]
      }
    case CLEAR_PERSISTENCE:
      return DEFAULT;
    default:
      return state;
  }
}
