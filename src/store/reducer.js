// const defaultState = {
//     data: []
// }
// export default (state = defaultState, action) =>{
//     if(action.type === 'init_redux') {
//         const newState = JSON.parse(JSON.stringify(state));
//         newState.data = action.data;
//         console.log(newState)
//         return newState;
//     }
//     return state;
// }
import TestReducer from '../components/Test/TestRedux'
import DropsReducer from '../components/Drops/DropsRedux'
import ModdalReducer from '../components/Modal/ModalRedux'
import ToolTipsReducer from '../components/ToolTips/TooltipsRudux'

export default {
    test: TestReducer,
    drops: DropsReducer,
    modal: ModdalReducer,
    tooltips: ToolTipsReducer
}