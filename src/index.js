import React from 'react'
import { render } from 'react-dom'
import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import reducer from './reducers/root'
import generateTree from './generateTree'
import Node from './containers/Node'
import { rootSaga } from './sagas'
const sagaMiddleware = createSagaMiddleware();
const tree = generateTree()
const store = createStore(
  reducer,
  tree,
  compose(
    applyMiddleware(thunk),
    applyMiddleware(sagaMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

sagaMiddleware.run(rootSaga);

render(
  <Provider store={store}>
    <Node id={0} />
  </Provider>,
  document.getElementById('root')
)
