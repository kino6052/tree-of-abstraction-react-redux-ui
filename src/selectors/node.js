export const nodes_selector = (state) => {
  let {
    nodes = {}
  } = state || {};
  return nodes;
};
export const node_selector = (state, nodeId) => {
  let {
    nodes = {}
  } = state || {}
  return nodes[nodeId];
};
export const added_nodes_selector = (state) => {
  let {
    persistence: {
      addedItemNodes = []
    } = {}
  } = state || {}
  return addedItemNodes;
}
export const changed_nodes_selector = (state) => {
  let {
    persistence: {
      changedItemNodes = []
    } = {}
  } = state || {}
  return changedItemNodes;
}
export const added_item_child_selector = (state) => {
  let {
    persistence: {
      addedItemChildNodes = []
    } = {}
  } = state || {}
  return addedItemChildNodes;
}