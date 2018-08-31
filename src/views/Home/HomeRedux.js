import * as eventActions from '../../components/Table/TableRedux'
import * as testActions from '../../components/Test/TestRedux'
import * as dropsActions from '../../components/Drops/DropsRedux'
import * as modalActions from '../../components/Modal/ModalRedux'
import * as toolTipsActions from '../../components/ToolTips/TooltipsRudux' 

import eventReducer from '../../components/Table/TableRedux'
import TestReducer from '../../components/Test/TestRedux'
import DropsReducer from '../../components/Drops/DropsRedux'
import ModalReducer from '../../components/Modal/ModalRedux'
import ToolTipsReducer from '../../components/ToolTips/TooltipsRudux'

import { combineReducers } from 'redux'

export default combineReducers({
   event: eventReducer,
   test: TestReducer,
   drop: DropsReducer,
   modal: ModalReducer,
   tooltips: ToolTipsReducer
});


 export const homeActions={eventActions, testActions, dropsActions, modalActions, toolTipsActions}