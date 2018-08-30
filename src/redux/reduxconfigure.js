import {createStore, applyMiddleware} from 'redux'

import eventManageReducers from'../views/EventManageRedux'
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
        let res = result.json()
        res.then(
            value => next({
            type: SUCCESS,
            loading: false,
            payload: value
        })
        )
        
    })
    .catch(err => {
        next({
            type: ERROR,
            loading: false,
            error: err
        })
    })
}

const middlewares = [fetchMiddleware]


export  const store = createStore(
    eventManageReducers,
    // window.devToolsExtension ? window.devToolsExtension() : undefined, 
    applyMiddleware(...middlewares)
)