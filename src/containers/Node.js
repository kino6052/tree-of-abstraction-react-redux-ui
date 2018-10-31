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
  handleNameChangeGenerator,
  renderChildGenerator
} from './misc/NodeEvents';
import { Name, NameInput} from './misc/components/Name'
import { Link } from './misc/components/Link'
import { AddButton } from './misc/components/Buttons'
import { Note } from './Note'

export class Node extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editName: false,
      name: '',
      id: null
    };
  }

  render() {
    let handleIncrementClick = handleIncrementClickGenerator(this);
    let handleAddChildClick = handleAddChildClickGenerator(this);
    let handleRemoveClick = handleRemoveClickGenerator(this);
    let handleChangeNameClick = handleChangeNameClickGenerator(this);
    let handleSaveNameClick = handleSaveNameClickGenerator(this);
    let handleNameChange = handleNameChangeGenerator(this);
    let renderChild = renderChildGenerator(this);

    const { counter, parentId, childIds, title: nodeName, collapsed } = this.props
    // console.log(this.props);
    const {
      state: {
        editName,
        name
      }
    } = this;
    if (true) {
      return (
        <div>
          {
            !editName &&
            <Name
              name={ nodeName }
              onClick={handleChangeNameClick}
            />
          }
          {
            editName &&
            (
              <div>
                <NameInput
                  onChange={handleNameChange}
                  onClickSave={handleSaveNameClick}
                  onClickCancel={handleChangeNameClick}
                />
                <Note/>
              </div>
            )
          }
          <Link parentId={parentId} onClick={handleRemoveClick}/>
          {
            childIds && (
              <ul>
                {childIds.map(renderChild)}
                <AddButton onClick={ handleAddChildClick }/>
              </ul>
            )
          }
        </div>
      )
    }
    return null;
  }
}

function mapStateToProps(state, ownProps) {
  return state.nodes[ownProps.id]
}

const ConnectedNode = connect(mapStateToProps, actions)(Node)
export default ConnectedNode
