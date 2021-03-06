import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducers from './reducers/rootReducer'

import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/sagaIndex'

const sagaMiddleware = createSagaMiddleware({ })

export default createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(sagaMiddleware)
  )
)

sagaMiddleware.run(rootSaga)