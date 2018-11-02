import { SELECT_NODE } from '../actions'

const DEFAULT = {
  currentNodeId: null,
  currentNotes: []
}

export default (state = DEFAULT, action) => {
  let {
    type,
    nodeId,
    currentNotes
  } = action;
  switch (type) {
    case SELECT_NODE: {
      return {
        ...state,
        currentNodeId: nodeId,
        currentNotes: currentNotes || []
      }
    }
    default:
      return state;
  }
}
