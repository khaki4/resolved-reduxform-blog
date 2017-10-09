import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
// import thunk from 'redux-thunk'
// import logger from 'redux-logger';
import sagaMonitor from './lib/sagaMoniter';
import reducers from './reducers/rootReducer'

import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/sagaIndex'

const sagaMiddleware = createSagaMiddleware({ sagaMonitor })

export default createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(sagaMiddleware)
  )
)

sagaMiddleware.run(rootSaga)