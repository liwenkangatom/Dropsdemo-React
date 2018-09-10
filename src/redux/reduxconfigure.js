import {createStore, applyMiddleware} from 'redux'

import eventManageReducers from '../views/EventManageRedux'

function  get(url,params){
        if (params) {
            let paramsArray = [];
            //拼接参数
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
        }
        console.log(url)
        //fetch请求
        return fetch(url,{
            method: 'GET',
        })
    }
// MIDDLEWARE
const fetchMiddleware = store => next => action =>{
    if(!action.url || !Array.isArray(action.types)) {
        return next(action)
    }
    const [LOADING, SUCCESS, ERROR] = action.types
    next({
        type: LOADING,
        loading: true,
        ...action
    })
    get(action.url, action.params)
    .then(result => {
        let res = result.text()
        console.log(res)
        res.then(
            value => {
                let data = JSON.parse(value)
                next({
                type: SUCCESS,
                loading: false,
                payload: data
            })}
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
console.log('adad')

export const store = createStore(
    eventManageReducers,
    // window.devToolsExtension ? window.devToolsExtension() : undefined, 
    applyMiddleware(...middlewares)
)