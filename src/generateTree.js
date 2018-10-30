export default function generateTree() {
  let tree = {
    nodes: {
      0: {
        id: 0,
        counter: 0,
        childIds: []
      }
    }
  }

  for (let i = 1; i < 1000; i++) {
    let parentId = Math.floor(Math.pow(Math.random(), 2) * i)
    tree.nodes[i] = {
      id: i,
      counter: 0,
      childIds: [],
      name: `Name_${parentId}`
    }
    tree.nodes[parentId].childIds.push(i)
  }

  return tree
}
