import React from 'react'
import { render } from 'react-dom'
import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import reducer from './reducers/root';
import App from './containers/App';
import { rootSaga } from './sagas';
const sagaMiddleware = createSagaMiddleware();
// const tree = generateTree()
const store = createStore(
  reducer,
  { nodes: { '5b6605a886ec2e1a5a713867': { id: '5b6605a886ec2e1a5a713867', title: 'ROOT', collapsed: false, childIds: [] } } },
  compose(
    applyMiddleware(thunk),
    applyMiddleware(sagaMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

sagaMiddleware.run(rootSaga);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
