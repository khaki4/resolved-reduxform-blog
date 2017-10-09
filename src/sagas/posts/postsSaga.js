import { all, fork, call, put, take } from 'redux-saga/effects';
import * as fromPostService from '../../service/postService';
import * as fromDomainPosts from '../../reducers/post/domainPosts'
import * as fromUiPostAddModal from '../../reducers/post/uiPostAddModal'

function* fetchPosts() {
  try {
    const response = yield fromPostService.getPosts();
    console.log('-----------------------------');
    console.log('response:', response);
    console.log('-----------------------------');
    yield put(fromDomainPosts.loadPosts(response.data));
  } catch (error) {
    console.warn(error);
  }
}
function* fetchOnePost(action) {
  try {
    const response = yield fromPostService.getOnePost(action.payload);
    console.log('-----------------------------');
    console.log('one post:', response);
    console.log('-----------------------------');
    yield put(fromDomainPosts.loadOnePost(response.data));
  } catch (error) {
    console.warn(error);
  }
}

function* createNewPost(action) {
  console.log('createNewPost:', action);
  try {
    const response = yield fromPostService.createPost(action.post);
    yield put(fromDomainPosts.addPost(response.data));
    yield action.resetForm();
    yield put(fromUiPostAddModal.changeModalWindow(false));
    yield action.resetForm()
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
    yield fromPostService.destoryPost(action.payload);
    yield call(goRootPage, action.goRootPage);
  } catch (error) {
    console.log('error deletePost -', error);
  }
}

function* watchFetchPostsRequest() {
  while (true) {
    yield take(fromDomainPosts.POST_FETCH_REQUEST);
    yield call(fetchPosts);
  }
}
function* watchFetchOnePostRequest() {
  while (true) {
    const action = yield take(fromDomainPosts.POST_FETCH_ONE_REQUEST);
    yield call(fetchOnePost, action);
  }
}
function* watchCreatePostRequest() {
  while (true) {
    const action = yield take(fromDomainPosts.POST_CREATE_REQUEST);
    yield call(createNewPost, action);
  }
}
function* watchDeletePostRequest() {
  while (true) {
    const action = yield take(fromDomainPosts.POST_DELETE_REQUEST);
    console.log('-----------------------------');
    console.log('watchDeletePostRequest:', action);
    console.log('-----------------------------');
    yield call(deletePost, action);
  }
}

export default [
  watchFetchPostsRequest,
  watchFetchOnePostRequest,
  watchCreatePostRequest,
  watchDeletePostRequest
]