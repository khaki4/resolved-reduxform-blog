// Actions
const BASE_PREFIX           = 'blog_heroku_api/domain_posts/'
const MODAL_WINDOW_CHANGE   = `${BASE_PREFIX}MODAL_WINDOW_CHANGE`

// Action Creators
export const changeModalWindow = (isOpen) => ({ type: MODAL_WINDOW_CHANGE, payload: isOpen })

// reducer
const initState = {
  isOpen: false,
}

export default (state = initState, action) => {
  switch (action.type) {
    case MODAL_WINDOW_CHANGE:
      return {
        ...state,
        isOpen: action.payload
      }
    default:
      return state
  }
}