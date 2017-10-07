import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
// import thunk from 'redux-thunk'
// import logger from 'redux-logger';
import reducers from './reducers/index'

import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/sagaIndex'

const sagaMiddleware = createSagaMiddleware()

export default createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(sagaMiddleware)
  )
)

sagaMiddleware.run(rootSaga)