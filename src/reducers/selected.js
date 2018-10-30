import { SELECT_NODE } from '../actions'

const DEFAULT = {
  currentNodeId: null,
  currentNotes: []
}

export default (state = DEFAULT, action) => {
  switch (action.type) {
    case SELECT_NODE: {
      return {
        ...state,
        currentNodeId: action.nodeId
      }
    }
    default:
      return state;
  }
}
