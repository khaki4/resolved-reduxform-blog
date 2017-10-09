import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import domainPostsReducer from './post/domainPosts'
import uiPostAddModalReducer from './post/uiPostAddModal'

const rootReducer = combineReducers({
  form: formReducer,
  dashboard: domainPostsReducer,
  ui: combineReducers({
    uiPostAddModal: uiPostAddModalReducer
  })
});

export default rootReducer;