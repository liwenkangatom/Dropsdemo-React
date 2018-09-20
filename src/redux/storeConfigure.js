// 接受reducers和中间件产出store

import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'

// 打包fetch请求， get请求格式
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

    res.then(
        value => {         
            console.log(value)
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

const Middlewares = [
    fetchMiddleware
];

export default createStore(reducers, applyMiddleware(...Middlewares))