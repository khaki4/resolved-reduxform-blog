// import mapKeys from 'lodash/mapKeys';
import { normalize, schema } from 'normalizr';
import _filter from 'lodash/filter';
import { createSelector } from 'reselect';

// Actions
const BASE_PREFIX                   = 'blog_heroku_api/domain_posts/'
export const POST_FETCH_REQUEST     = `${BASE_PREFIX}POST_FETCH_REQUEST`
export const POST_FETCH_ONE_REQUEST = `${BASE_PREFIX}POST_FETCH_ONE_REQUEST`
export const POST_FETCH_CLEAR       = `${BASE_PREFIX}POST_FETCH_CLEAR`
export const POST_DELETE_REQUEST    = `${BASE_PREFIX}POST_DELETE_REQUEST`
export const POST_LOAD              = `${BASE_PREFIX}POST_LOAD`
export const POST_FETCH_ONE         = `${BASE_PREFIX}POST_FETCH_ONE`
export const POST_ADD               = `${BASE_PREFIX}POST_ADD`
export const POST_CREATE_REQUEST    = `${BASE_PREFIX}POST_CREATE_REQUEST`

export const TEST_1    = `${BASE_PREFIX}TEST_1`
export const TEST_2    = `${BASE_PREFIX}TEST_2`
export const TEST_3    = `${BASE_PREFIX}TEST_3`

// Action Creators
export const requestPost        = () => ({type: POST_FETCH_REQUEST})
export const requestOnePost     = (id) => ({type: POST_FETCH_ONE_REQUEST, payload: id})
export const OnePostClear       = (id) => ({type: POST_FETCH_CLEAR})
export const loadOnePost        = (post) => ({type: POST_FETCH_ONE, payload: post})
export const loadPosts          = (posts) => ({type: POST_LOAD, payload: posts})
export const addPost            = (post) => ({ type: POST_ADD, payload: post })
export const savePost           = (post, resetForm) => ({type: POST_CREATE_REQUEST, post, resetForm})
export const deletePostRequest  = (id, goRootPage) => ({ type: POST_DELETE_REQUEST, payload: id, goRootPage})

export const test1 = (posts) => ({ type: TEST_1, payload: posts})
export const test2 = (posts) => ({ type: TEST_1, payload: posts})
export const test3 = (posts) => ({ type: TEST_1, payload: posts})

// Reducers
const postsSchema = new schema.Entity('posts')
export const postsListSchema = [postsSchema];
export const initState = {
  posts: [],
  postOne: {},
}
// follow rules of 'https://deminoth.github.io/redux/recipes/reducers/BasicReducerStructure.html'
// domain data reducer
export default (state = initState, action) => {
  switch (action.type) {
    case TEST_1:
      return {
        ...state,
        posts: [...state.posts, action.payload]
      }
    case TEST_2:
      return {
        ...state,
        posts: [...state.posts, action.payload]
      }
    case TEST_3:
      return {
        ...state,
        posts: [...state.posts, action.payload]
      }
    case POST_LOAD:
      return {
        ...state,
        posts: normalize(action.payload, postsListSchema).entities.posts
      }
    case POST_FETCH_ONE:
      return {
        ...state,
        postOne: action.payload
      }
    case POST_FETCH_CLEAR:
      return {
        ...state,
        postOne: {},
      }
    case POST_ADD:
      return {
        ...state,
        posts: {...state.posts, [action.payload.id]: {...action.payload}}
      }
    default:
      return state
  }
}

// selectors
export const getSelectVisiblePosts = (() => {
  const postsSelector = posts => posts
  const filterSelector = (posts, filter) => filter
  return createSelector(
    postsSelector,
    filterSelector,
    (posts, filter) => {
      if (!filter) {
        return posts
      }
      const filteredPosts = _filter(posts, (post) => {
        if (post && post.categories && post.categories === filter) {
          return post
        }
      })

      return filteredPosts
    }
  )
})()


