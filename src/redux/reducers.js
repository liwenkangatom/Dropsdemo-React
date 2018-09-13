import {combineReducers} from 'redux'

import homeReducers from '../views/Home/homeRedux' 
import manageReducers from '../views/Manage/manageRedux'

export default combineReducers({
    home:homeReducers,
    manage: manageReducers
})
