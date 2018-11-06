export default (state = [], action) => {
  let {
    type,
    notes = [],
  } = action;
  let {
    noteId,
    title = '',
    content = ''
  } = action;
  switch (type) {
    case 'SET_NOTES':
      notes = notes || [];
      return [...notes];
    case 'SAVE_NOTE':
      let newNotes = [...state];
      for (let i in newNotes) {
        let note = newNotes[i];
        if (note['_id'] === noteId) {
          newNotes[i].title = title;
          newNotes[i].content = content;
        };
      }
      newNotes.forEach((note) => {

      })
      return newNotes;
    default:
      return state;
  }
}
