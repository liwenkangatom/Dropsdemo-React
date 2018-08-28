import {actionTypes} from '../compnents/constent.js'
import {call, put, takeEvery, take} from 'redux-saga/effects'
import {apiUrls} from '../api'
function* sagaPart(action) {
    conole.log(action)
    const apiget = function() {
        return fetch(`${apiUrls.sagaParturl}?key=${action.payload}...`,{
            method: 'GET'
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            return res
        })
    }
    const res = yield call(apiget)
    yield take(actionTypes.MATCH_TAKE)
    yield put({
        type: actionTypes.ACTION_NAME,
        payload: res
    })
}
function* rootSaga() {
    yield takeEvery(actionTypes.Part_action, sagaPart)
}
export default rootSaga