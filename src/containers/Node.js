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
import {
  Link
} from './misc/components/Link'
import {
  AddButton
} from './misc/components/Buttons'

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
        <button onClick={handleIncrementClick}>+</button>
        <Link parentId={parentId} onClick={handleRemoveClick}/>
        <ul>
          {childIds.map(renderChild)}
          <AddButton onClick={ handleAddChildClick }/>
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
