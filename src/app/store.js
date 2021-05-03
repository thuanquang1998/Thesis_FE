import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas/rootSaga'
import rootReducer from '../reducers/rootReducers'

const sagaMiddleware = createSagaMiddleware()

// redux sagas is a middleware that we apply to the store
export const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
sagaMiddleware.run(rootSaga)

export default store;
