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
        root: {
          id,
          childIds,
          title
        } = {}
      } = {}
    } = this;
    if (id) {
      return (<Node id={id} childIds={childIds} title={title}/>)
    } else {
      return null;
    }
  }
}

function mapStateToProps(state, ownProps) {
  return { root: state.nodes['5b6605a886ec2e1a5a713867'] }
}

const ConnectedApp = connect(mapStateToProps)(App)
export default ConnectedApp
