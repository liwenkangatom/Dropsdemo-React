import {createStore, combineReducers, applyMiddleware} from 'redux'
// import createSagaMiddleware from 'redux-saga'
// import  reducer from './reducer'
// import eventreducer from '../views/Home/HomeRedux'
// import rootSaga from './saga.js'
import homeReducers from'../views/Home/HomeRedux'
// MIDDLEWARE
const fetchMiddleware = store => next => action =>{
    if(!action.url || !Array.isArray(action.types)) {
        return next(action)
    }
    console.log('进入fetch中间件')
    const [LOADING, SUCCESS, ERROR] = action.types
    next({
        type: LOADING,
        loading: true,
        ...action
    })
    fetch(action.url, {params: action.params})
    .then(result => {
        next({
            type: SUCCESS,
            loading: false,
            payload: result
        })
    })
    .catch(err => {
        next({
            type: ERROR,
            loading: false,
            error: err
        })
    })
}
// let initState={
//     list: 3
// }
// function testAction
// let testreducer = (state = initState, action) => {
//     switch(action.type) {
//         case 'TEST_1':{
//             return {
//                 ...state,
//                 list: 4
//             }
//         }
//         case 'TEST_2': {
//             return {
//                 ...state,
//                 list: 4
//             }
//         }
//         default: {
//             return {
//                 ...state
//             }
//         }
//     }
// }

// const sagaMiddleware = createSagaMiddleware()
// const reducerAll = Object.assign({},{
//     test: testreducer,
//     event: eventreducer
// })
const middlewares = [fetchMiddleware]
console.log(homeReducers)

export  const store = createStore(
    homeReducers,
    // window.devToolsExtension ? window.devToolsExtension() : undefined, 
    applyMiddleware(...middlewares)
)
// sagaMiddleware.run(rootSaga)