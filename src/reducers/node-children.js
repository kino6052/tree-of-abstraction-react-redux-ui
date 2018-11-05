export default (state = [], action) => {
  let {
    type,
    itemChildren,
    nodeId: childId,
    parentId
  } = action;
  switch (type) {
    case 'SET_ITEM_CHILDREN':
      return itemChildren;
    case 'CREATE_NODE':
      return [...state, { childId, parentId }]
    default:
      return state;
  }
}
