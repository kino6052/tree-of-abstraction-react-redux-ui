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

export const get_parent_node_id_selector = (state, nodeId) => {
  let {
    nodes = {}
  } = state;
  for (let id of nodes){
    let childIds = nodes[id].childIds;
    let hasNodeId = childIds.find(id => id ===  nodeId) ? true : false;
    if (hasNodeId) {
      return id;
    }
    return;
  }
}

export const changed_nodes_selector = (state) => {
  let {
    nodes = {},
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
