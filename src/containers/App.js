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
    console.log('here');
    if (id) {
      return (<Node {...this.props} collapsed={false}/>)
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
