import eventsReducer from '../../components/Drops/DropsRedux'
import { combineReducers } from 'redux'

export default combineReducers({
    evnet: eventsReducer
})
// export * as eventsActions from '../../components/Drops/DropsRedux'