export const notes_selector = (state) => {
  let {
    notes = []
  } = state || {};
  return notes;
};
export const note_selector = (state, noteId) => {
  let {
    notes = []
  } = state || {}
  return notes.find(id => id === noteId);
};
export const added_notes_selector = (state) => {
  let {
    persistence: {
      addedNoteNodes = []
    } = {}
  } = state || {}
  return addedNoteNodes;
}
export const changed_notes_selector = (state) => {
  let {
    persistence: {
      changedNoteNodes = []
    } = {}
  } = state || {}
  return changedNoteNodes;
}
export const added_item_note_selector = (state) => {
  let {
    persistence: {
      addedItemNoteNodes = []
    } = {}
  } = state || {}
  return addedItemNoteNodes;
}
