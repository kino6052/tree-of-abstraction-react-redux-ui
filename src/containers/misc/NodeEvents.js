import React from 'react';
import * as actions from '../../actions';
import ConnectedNode from '../Node';

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
    const childId = createNode().nodeId
    addChild(id, childId)
  }
}

export const handleRemoveClickGenerator = (that) => {
  return e => {
    e.preventDefault()

    const { toggleCollapseMany, deleteNode, parentId, id } = that.props
    toggleCollapseMany(id)
    // deleteNode(id)
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
    selectNode(id);
  }
}

export const handleSaveNameClickGenerator = (that) => {
  return e => {
    e.preventDefault()
    // saveName (state.name, id)
    let {
      state: {
        editName,
        name
      },
      props: {
        saveName,
        id
      }
    } = that;
    saveName(id, name)
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
        name
      }
    } = that;
    // saveName(name, id)

    that.setState({
      name: e.target.value
    })
  }
}

export const renderChildGenerator = (that) => {
  return childId => {
    const { id } = that.props
    return (
      <li key={childId}>
        <ConnectedNode id={childId} parentId={id} title />
      </li>
    )
  }
}
