import { takeEvery } from 'redux-saga';
import { all, fork, call, put, take } from 'redux-saga/effects';
import {
  getPosts,
  getOnePost,
  createPost,
  destoryPost
} from '../service/postService';
import {
  POST_FETCH_REQUEST,
  POST_FETCH_ONE_REQUEST,
  POST_CREATE_REQUEST,
  POST_DELETE_REQUEST,
  loadPosts,
  loadOnePost,
  addPost,
  changeModalWindow
} from '../reducers/post/postIndex';

function* fetchPosts() {
  try {
    const response = yield getPosts();
    console.log('-----------------------------');
    console.log('response:', response);
    console.log('-----------------------------');
    yield put(loadPosts(response.data));
  } catch (error) {
    console.warn(error);
  }
}
function* fetchOnePost(action) {
  console.log(action);
  try {
    const response = yield getOnePost(action.payload);
    console.log('-----------------------------');
    console.log('one post:', response);
    console.log('-----------------------------');
    yield put(loadOnePost(response.data));
  } catch (error) {
    console.warn(error);
  }
}

function* createNewPost(action) {
  console.log('createNewPost:', action);
  try {
    const response = yield createPost(action.post);
    yield put(addPost(response.data));
    yield action.resetForm();
    yield put(changeModalWindow(false));
  } catch (error) {
    console.warn(error);
  }
}
function* goRootPage(action) {
  yield action();
}
function* deletePost(action) {
  console.log('deletePost action:', action);
  try {
    const response = yield destoryPost(action.payload);
    yield call(goRootPage, action.goRootPage);
  } catch (error) {
    console.log('error deletePost -', error);
  }
}

function* watchFetchPostsRequest() {
  while (true) {
    yield take(POST_FETCH_REQUEST);
    yield call(fetchPosts);
  }
}
function* watchFetchOnePostRequest() {
  while (true) {
    const action = yield take(POST_FETCH_ONE_REQUEST);
    yield call(fetchOnePost, action);
  }
}
function* watchCreatePostRequest() {
  while (true) {
    const action = yield take(POST_CREATE_REQUEST);
    yield call(createNewPost, action);
  }
}

function* watchDeletePostRequest() {
  while (true) {
    const action = yield take(POST_DELETE_REQUEST);
    console.log('-----------------------------');
    console.log('watchDeletePostRequest:', action);
    console.log('-----------------------------');
    yield call(deletePost, action);
  }
}

export default function* root() {
  yield all([
    fork(watchFetchPostsRequest),
    fork(watchFetchOnePostRequest),
    fork(watchCreatePostRequest),
    fork(watchDeletePostRequest)
  ]);
}
