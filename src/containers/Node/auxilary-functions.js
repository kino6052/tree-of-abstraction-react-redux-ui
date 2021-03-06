import React from 'react';
import * as actions from '../../actions';
import ConnectedNode from './Node';
import { getAllDescendantIds } from '../../reducers/nodes';

export const handleIncrementClickGenerator = (that) => {
  return () => {
    const { increment, id } = that.props
    increment(id)
  }
}

export const handleAddChildClickGenerator = (that) => {
  return e => {
    e.preventDefault()
    const { addChild, createNode, id } = that.props
    const childId = createNode(id).nodeId
    addChild(id, childId)
  }
}

export const handleRemoveClickGenerator = (that) => {
  return e => {
    e.preventDefault()

    const { toggleCollapseMany, deleteNode, parentId, id } = that.props
    deleteNode(id)
  }
}

export const handleCollapseClickGenerator = (that) => {
  return e => {
    e.preventDefault()

    const { toggleCollapseMany, deleteNode, parentId, id } = that.props
    toggleCollapseMany(id)
  }
}

export const handleChangeNameClickGenerator = (that) => {
  return e => {
    let {
      props: {
        id,
        selectNode
      }
    } = that;
    e.preventDefault()
    that.setState({
      editName: !that.state.editName
    })
  }
}

export const handleSelectNodeGenerator = (that) => {
  return e => {
    let {
      props: {
        id,
        selectNode,
        notes = [],
        nodes = {}
      }
    } = that;
    e.preventDefault()
    let descendantIds = [...getAllDescendantIds(nodes, id), id];
    console.log('Selected id', id);
    let selectedNotes = notes.filter(note => {
      let {
        itemIds = []
      } = note;
      let isContained = false;
      for (let descendantId of descendantIds) {
          isContained = isContained || itemIds.find(itemId => itemId === descendantId) ? true : false;
      }
      if (isContained){
        return note;
      }
    })
    selectNode(id, selectedNotes);
  }
}

export const handleSaveNameClickGenerator = (that) => {
  return e => {
    e.preventDefault()
    // saveName (state.name, id)
    let {
      state: {
        editName,
        title
      },
      props: {
        saveName,
        id
      }
    } = that;

    saveName(id, title)
    that.setState({
      editName: !editName
    })
  }
}

export const handleNameChangeGenerator = (that) => {
  return e => {
    e.preventDefault()
    // saveName (state.name, id)
    let {
      state: {
        title
      }
    } = that;
    // saveName(name, id)

    that.setState({
      title: e.target.value
    })
  }
}

export const renderChildGenerator = (that) => {
  return childId => {
    const { id, collapsed } = that.props
    return (
      <li key={childId}>
        <ConnectedNode id={childId} parentId={id} title />
      </li>
    )
  }
}
