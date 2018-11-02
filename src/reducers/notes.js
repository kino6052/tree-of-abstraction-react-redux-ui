export default (state = [], action) => {
  let {
    type,
    notes
  } = action;
  switch (type) {
    case 'SET_NOTES':
      return notes;
    default:
      return state;
  }
}
