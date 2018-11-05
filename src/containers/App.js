import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Note from './Note/Note'
import { Node } from './Node/Node'

import './app.css';

export class App extends Component {
  constructor(props){
    super(props);
    this.handleSaveClick = this.handleSaveClick.bind(this);
  }
  handleSaveClick(e){
    let {
      props: {
        persistNodes
      }
    } = this;
    persistNodes();
  }
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
        <div>
          <div className={'Menu'}>
            <button onClick={this.handleSaveClick}>Save</button>
          </div>
          <div className={'App'}>
            <div className={'NodeContainer'}>
              <h1> Hierarchy </h1>
              <Node {...this.props} collapsed={false}/>
            </div>
            <Note />
          </div>
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
