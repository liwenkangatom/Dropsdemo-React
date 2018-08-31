import  * as LeftSliderBarActions from '../components/LeftSlideBar/LeftSliderBarRedux'
import * as EventDropsActions from '../components/Drops/DropsRedux'
import LeftSliderBarReducer from '../components/LeftSlideBar/LeftSliderBarRedux'
import EventDropsReducer from '../components/Drops/DropsRedux'
import { combineReducers } from 'redux'
console.log(typeof(LeftSliderBarReducer))
console.log(typeof(EventDropsReducer));
export default combineReducers(
    {
        tag: LeftSliderBarReducer,
        event: EventDropsReducer
    }
)
export {
    LeftSliderBarActions,
    EventDropsActions
}