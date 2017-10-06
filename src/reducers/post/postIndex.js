import mapKeys from 'lodash/mapKeys';
import { normalize, schema } from 'normalizr';
import _filter from 'lodash/filter';
import { getPosts, createPost, destoryPost } from '../../service/postService';

// Actions
export const POST_FETCH_REQUEST = 'blog_heroku_api/posts/POST_FETCH_REQUEST'
export const POST_FETCH_ONE_REQUEST = 'blog_heroku_api/posts/POST_FETCH_ONE_REQUEST'
export const POST_FETCH = 'blog_heroku_api/posts/POST_FETCH'
export const POST_FETCH_ONE = 'blog_heroku_api/posts/POST_FETCH_ONE'
export const POST_ADD = 'blog_heroku_api/posts/POST_ADD'
export const POST_DELETE = 'blog_heroku_api/posts/POST_DELETE'
const MODAL_WINDOW_CHANGE = 'blog_heroku_api/posts/MODAL_WINDOW_CHANGE'

// Action Creators
export const requestPost = () => ({type: POST_FETCH_REQUEST})
export const requestOnePost = (id) => ({type: POST_FETCH_ONE_REQUEST, payload: id})
export const fetchPosts = (posts) => ({type: POST_FETCH, payload: posts})
export const changeModalWindow = (isOpen) => ({ type: MODAL_WINDOW_CHANGE, payload: isOpen })
export const addPost = (post) => ({ type: POST_ADD, payload: post })
export const savePost = (post, resetForm) => (dispatch) => {
  resetForm()
  createPost(post)
    .then((res) => {
      dispatch(addPost(res))
      dispatch(changeModalWindow(false))
    })
}
export const loadPosts = () => (dispatch) => {
  getPosts()
    .then(posts => {
      dispatch(fetchPosts(posts.data))
    })
}
export const deletePost = (id, callback) => (dispatch) => {
  destoryPost(id)
    .then(res => callback())
}

// Reducer
const initState = {
  posts: [],
  selectedPost: {},
  modal: {},
}

const postsSchema = new schema.Entity('posts')
const postsListSchema = [postsSchema];
export default (state = initState, action) => {
  switch (action.type) {
    case POST_FETCH:
      console.log('posts:', normalize(action.payload, postsListSchema))
      return {
        ...state,
        posts: normalize(action.payload, postsListSchema).entities.posts
      }
    case POST_FETCH_ONE:
      return {
        ...state,
        selectedPost: action.payload
      }
    case POST_ADD:
      return {
        ...state,
        posts: {...state.posts, [action.payload.id]: {...action.payload}}
      }
    case MODAL_WINDOW_CHANGE:
      return {
        ...state,
        modal: {
          ...state.modal,
          isOpen: action.payload
        }
      }
    default:
      return state
  }
}

// selector
export const getVisiblePosts = (posts, filter) => {
  if (!filter) {
    return posts
  }
  const filteredPosts = _filter(posts, (post) => {
    if (post && post.categories && post.categories === filter) {
      return post
    }
  })
  const result = normalize(filteredPosts, postsListSchema).entities.posts

  return result
}