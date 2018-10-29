import React from 'react'
import { render } from 'react-dom'
import {createStore, applyMiddleware, compose} from 'redux';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import reducer from './reducers'
import generateTree from './generateTree'
import Node from './containers/Node'

const tree = generateTree()
const store = createStore(
    reducer,
    tree,
    compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

render(
  <Provider store={store}>
    <Node id={0} />
  </Provider>,
  document.getElementById('root')
)
