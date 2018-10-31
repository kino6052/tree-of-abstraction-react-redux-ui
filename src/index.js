import React from 'react'
import { render } from 'react-dom'
import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import reducer from './reducers/root'
import generateTree from './generateTree'
import Node from './containers/Node'
import App from './containers/App'
import { rootSaga } from './sagas'
const sagaMiddleware = createSagaMiddleware();
// const tree = generateTree()
const store = createStore(
  reducer,
  { '5b6605a886ec2e1a5a713867': { id: '5b6605a886ec2e1a5a713867', name: 'ROOT' } },
  compose(
    applyMiddleware(thunk),
    applyMiddleware(sagaMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

sagaMiddleware.run(rootSaga);

render(
  <Provider store={store}>
    <App id={'5b6605a886ec2e1a5a713867'} name='ROOT' />
  </Provider>,
  document.getElementById('root')
)
