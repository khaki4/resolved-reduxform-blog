// Actions
const BASE_PREFIX           = 'blog_heroku_api/domain_posts/'
const SET_MODAL_WINDOW_STATE   = `${BASE_PREFIX}SET_MODAL_WINDOW_STATE`

// Action Creators
export const changeModalWindow = (isOpen) => ({ type: SET_MODAL_WINDOW_STATE, payload: isOpen })

// reducer
const initState = {
  isOpen: false,
}

export default (state = initState, action) => {
  switch (action.type) {
    case SET_MODAL_WINDOW_STATE:
      return {
        ...state,
        isOpen: action.payload
      }
    default:
      return state
  }
}