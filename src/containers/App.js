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
import { Node } from './Node'
import Note from './Note'

import './app.css';

export class App extends Component {
  render() {
    let {
      props: {
        id,
        childIds,
        title,
        actions
      } = {}
    } = this;
    if (id) {
      return (
        <div className={'App'}>
          <div className={'NodeContainer'}>
            <Node {...this.props} collapsed={false}/>
          </div>
          <Note />
        </div>
      )
    } else {
      return null;
    }
  }
}

function mapStateToProps(state, ownProps) {
  return state.nodes['5b6605a886ec2e1a5a713867'];
}

const ConnectedApp = connect(mapStateToProps, actions)(App)
export default ConnectedApp
