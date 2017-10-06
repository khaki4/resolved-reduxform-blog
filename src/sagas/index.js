import { takeEvery } from 'redux-saga';
import { fork, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { getPosts, getOnePost , getOnePost} from '../service/postService';
import { POST_FETCH, POST_FETCH_REQUEST } from '../reducers/post/postIndex'

const fetchPosts = () =>
  getPosts().then(res => res.data)

// one api call
function* callfetchPosts() {
  const result = yield call(fetchPosts);
  console.log(result);
  if (result) {
    yield put({ type: POST_FETCH, payload: result });
  }
}

function* fetchPostsSaga() {
  yield* takeEvery(POST_FETCH_REQUEST, callfetchPosts);
}

const fetchOnePost = (id) =>
getPosts().then(res => res.data)

// one api call
function* callfetchPosts() {
const result = yield call(fetchPosts);
console.log(result);
if (result) {
  yield put({ type: POST_FETCH, payload: result });
}
}

function* fetchPostsSaga() {
yield* takeEvery(POST_FETCH_REQUEST, callfetchPosts);
}

export default function* root() {
  yield [
    fork(fetchPostsSaga),
  ];
}

/*
function something() {
  // call api
}

function* callSomething(action) {
  const result = yield call(something, action.param);
  yield put({ type: '', result });
}

function* somethingSaga() {
  yield takeEvery('MY_ACTION', callSomething);
}
*/
