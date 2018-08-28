import {createStore, combineReducers, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import appReducer from './resucers'
import rootSaga from './saga.js'

const sagaMiddleware = createSagaMiddleware()
const reducerAll = {
    appReducer: appReducer
}
const middlewares = [sagaMiddleware]
export const store = createStore(
    combineReducers({...reducerAll}),
    window.devToolsExtension ? window.devToolsExtension() : undefined, 
    applyMiddleware(...middlewares)
)
sagaMiddleware.run(rootSaga)