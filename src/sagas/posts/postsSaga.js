import { all, fork, call, put, take } from 'redux-saga/effects';
import * as fromPostService from '../../service/postService';
import * as fromDomainPosts from '../../reducers/post/domainPosts'
import * as fromUiPostAddModal from '../../reducers/post/uiPostAddModal'

export function* fetchPosts() {
  try {
    const response = yield call(fromPostService.getPosts);
    yield put(fromDomainPosts.loadPosts(response.data));
  } catch (error) {
    console.warn(error);
  }
}


export function* fetchOnePost(action) {
  try {
    const response = yield call(fromPostService.getOnePost, action.payload);
    yield put(fromDomainPosts.loadOnePost(response.data));
  } catch (error) {
    console.warn(error);
  }
}

export function* createNewPost(action) {
  console.log('createNewPost:', action);
  try {
    const response = yield call(fromPostService.createPost, action.post);
    yield put(fromDomainPosts.addPost(response.data));
    yield put(action.resetForm());
    yield put(fromUiPostAddModal.changeModalWindow(false));
    yield action.resetForm()
  } catch (error) {
    console.warn(error);
  }
}
export function* goRootPage(action) {
  yield call(action);
}
export function* deletePost(action) {
  console.log('deletePost action:', action);
  try {
    yield call(fromPostService.destoryPost, action.payload);
    yield call(goRootPage, action.goRootPage);
  } catch (error) {
    console.log('error deletePost -', error);
  }
}

// watch Sagas
export function* watchFetchPostsRequest() {
  while (true) {
    yield take(fromDomainPosts.POST_FETCH_REQUEST);
    yield call(fetchPosts);
  }
}
export function* watchFetchOnePostRequest() {
  while (true) {
    const action = yield take(fromDomainPosts.POST_FETCH_ONE_REQUEST);
    yield call(fetchOnePost, action);
  }
}
export function* watchCreatePostRequest() {
  while (true) {
    const action = yield take(fromDomainPosts.POST_CREATE_REQUEST);
    yield call(createNewPost, action);
  }
}
export function* watchDeletePostRequest() {
  while (true) {
    const action = yield take(fromDomainPosts.POST_DELETE_REQUEST);
    yield call(deletePost, action);
  }
}

export default [
  watchFetchPostsRequest,
  watchFetchOnePostRequest,
  watchCreatePostRequest,
  watchDeletePostRequest
]