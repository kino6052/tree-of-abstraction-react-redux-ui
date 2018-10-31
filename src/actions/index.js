export const INCREMENT = 'INCREMENT'
export const CREATE_NODE = 'CREATE_NODE'
export const DELETE_NODE = 'DELETE_NODE'
export const ADD_CHILD = 'ADD_CHILD'
export const REMOVE_CHILD = 'REMOVE_CHILD'
export const SAVE_NAME = 'SAVE_NAME'
export const SELECT_NODE = 'SELECT_NODE'
export const TOGGLE_COLLAPSE_MANY = 'TOGGLE_COLLAPSE_MANY'
export const FETCH_ITEMS = 'FETCH_ITEMS'
export const FETCH_NOTES = 'FETCH_NOTES'
export const FETCH_ITEM_NOTES = 'FETCH_ITEM_NOTES'
export const FETCH_ITEM_CHILDREN = 'FETCH_ITEM_CHILDREN'

export const increment = (nodeId) => ({
  type: INCREMENT,
  nodeId
})

let nextId = 0
export const createNode = () => ({
  type: CREATE_NODE,
  nodeId: `new_${nextId++}`
})

export const deleteNode = (nodeId) => ({
  type: DELETE_NODE,
  nodeId
})

export const addChild = (nodeId, childId) => ({
  type: ADD_CHILD,
  nodeId,
  childId
})

export const removeChild = (nodeId, childId) => ({
  type: REMOVE_CHILD,
  nodeId,
  childId
})

export const saveName = (nodeId, name) => ({
  type: SAVE_NAME,
  nodeId,
  name
})

export const selectNode = (nodeId) => ({
  type: SELECT_NODE,
  nodeId
})

export const toggleCollapseMany = (nodeId) => ({
  type: TOGGLE_COLLAPSE_MANY,
  nodeId
})
