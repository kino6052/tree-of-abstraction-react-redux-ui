import { all } from 'redux-saga/effects'

const api_root = 'https://personal-dashboard-umbrella-kino6052.c9users.io';

export async function* helloSaga() {
  console.log('Hello Sagas!')
  // let test = await fetch(`${api_root}/item`)
  // let json = await test.json();
  // console.log(json);
}

export function* rootSaga() {
  yield all([
    helloSaga()
  ])
}
