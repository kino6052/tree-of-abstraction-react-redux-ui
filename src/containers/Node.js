import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import {
  handleIncrementClickGenerator,
  handleAddChildClickGenerator,
  handleRemoveClickGenerator,
  handleChangeNameClickGenerator,
  handleSaveNameClickGenerator,
  renderChildGenerator
} from './misc/NodeEvents';
import {
  Name,
  NameInput
} from './misc/components/Name'

export class Node extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editName: false
    };
  }

  render() {
    let handleIncrementClick = handleIncrementClickGenerator(this);
    let handleAddChildClick = handleAddChildClickGenerator(this);
    let handleRemoveClick = handleRemoveClickGenerator(this);
    let handleChangeNameClick = handleChangeNameClickGenerator(this);
    let handleSaveNameClick = handleSaveNameClickGenerator(this);
    let renderChild = renderChildGenerator(this);

    const { counter, parentId, childIds, name } = this.props
    const {
      state: {
        editName
      }
    } = this;
    return (
      <div>
        { !editName && <Name name={name} onClick={handleChangeNameClick}/> }
        {
          editName &&
          <NameInput
            onClickSave={handleSaveNameClick}
            onClickCancel={handleChangeNameClick}
          />
        }
        {' '}
        <button onClick={handleIncrementClick}>
          +
        </button>
        {' '}
        {typeof parentId !== 'undefined' &&
          <a href="#" onClick={handleRemoveClick} // eslint-disable-line jsx-a11y/anchor-is-valid
             style={{ color: 'lightgray', textDecoration: 'none' }}>
            ×
          </a>
        }
        <ul>
          {childIds.map(renderChild)}
          <li key="add">
            <a href="#" // eslint-disable-line jsx-a11y/anchor-is-valid
              onClick={handleAddChildClick}
            >
              Add child
            </a>
          </li>
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return state[ownProps.id]
}

const ConnectedNode = connect(mapStateToProps, actions)(Node)
export default ConnectedNode
