import mapKeys from 'lodash/mapKeys';
import { normalize, schema } from 'normalizr';
import _filter from 'lodash/filter';

// Actions
export const POST_FETCH_REQUEST = 'blog_heroku_api/posts/POST_FETCH_REQUEST'
export const POST_FETCH_ONE_REQUEST = 'blog_heroku_api/posts/POST_FETCH_ONE_REQUEST'
export const POST_DELETE_REQUEST = 'blog_heroku_api/posts/POST_DELETE_REQUEST'
export const POST_LOAD = 'blog_heroku_api/posts/POST_LOAD'
export const POST_FETCH_ONE = 'blog_heroku_api/posts/POST_FETCH_ONE'
export const POST_ADD = 'blog_heroku_api/posts/POST_ADD'
export const POST_CREATE_REQUEST = 'blog_heroku_api/posts/POST_CREATE_REQUEST'
const MODAL_WINDOW_CHANGE = 'blog_heroku_api/posts/MODAL_WINDOW_CHANGE'

// Action Creators
export const requestPost = () =>  ({type: POST_FETCH_REQUEST})
export const requestOnePost = (id) => ({type: POST_FETCH_ONE_REQUEST, payload: id})
export const loadOnePost = (post) => ({type: POST_FETCH_ONE, payload: post})
export const loadPosts = (posts) => ({type: POST_LOAD, payload: posts})
export const changeModalWindow = (isOpen) => ({ type: MODAL_WINDOW_CHANGE, payload: isOpen })
export const addPost = (post) => ({ type: POST_ADD, payload: post })
export const savePost = (post, resetForm) => ({type: POST_CREATE_REQUEST, post, resetForm})
export const deletePostRequest = (id, goRootPage) => ({ type: POST_DELETE_REQUEST, payload: id, goRootPage})

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
    case POST_LOAD:
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