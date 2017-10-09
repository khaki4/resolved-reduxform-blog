// import { takeEvery } from 'redux-saga';
import { fork } from 'redux-saga/effects';
import postSagas from "./posts/postsSaga";

const sagas = [
  ...postSagas,
]

export default function* root() {
  yield sagas.map(saga => fork(saga));
}