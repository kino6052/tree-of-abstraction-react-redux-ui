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
  handleSelectNodeGenerator,
  renderChildGenerator
} from './misc/NodeEvents';
import { Name, NameInput} from './misc/components/Name'
import { Link } from './misc/components/Link'
import { AddButton, EditButton } from './misc/components/Buttons'

import './node.css';

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
    let handleSelectNodeClick = handleSelectNodeGenerator(this);
    let renderChild = renderChildGenerator(this);

    const { counter, parentId, childIds, title: nodeTitle, collapsed, id } = this.props
    const {
      state: {
        editName,
        title
      }
    } = this;
    if (!collapsed) {
      return (
        <div className={'Node'}>
          <div className={'Controls'} >
            <Link className={'.Collapse'} parentId={parentId} onClick={handleRemoveClick} collapsed={collapsed}/>
            {
              !editName &&
              <Name
                title={ nodeTitle }
                onClick={handleSelectNodeClick}
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
                </div>
              )
            }
            <AddButton onClick={ handleAddChildClick }/>
            <EditButton onClick={ handleChangeNameClick }/>
          </div>
          {
            <div>
              { childIds && (
                <ul className={'Children'}>
                  { childIds.map(renderChild) }
                </ul>
              ) }
            </div>
          }
        </div>
      )
    }
    return null
  }
}

function mapStateToProps(state, ownProps) {
  return state.nodes[ownProps.id]
}

const ConnectedNode = connect(mapStateToProps, actions)(Node)
export default ConnectedNode
