import { all } from 'redux-saga/effects'

export function* helloSaga() {
  console.log('Hello Sagas!')
}

export function* rootSaga() {
  yield all([
    helloSaga()
  ])
}
