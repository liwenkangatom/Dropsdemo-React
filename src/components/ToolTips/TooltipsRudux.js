// CONSTENTS
const DISPLAY_TOOLTIPS= 'DISPLAY_TOOLTIPS'
const DESTROY_TOOLTIPS= 'DESTROY_TOOLTIPS' 
// ACTION CREATOR
export function ToolTipsActionCreator() {
    return {
        type: DISPLAY_TOOLTIPS
    }
}
// REDUCER
const initState = {
    toolTipsVisible: true
}
export default function ToolTipsReducer(state = initState, Action) {
    switch (Action.type) {
        case DISPLAY_TOOLTIPS: {
            return {
                ...state,
               toolTipsVisible : false
        
            }
        }
        case DESTROY_TOOLTIPS: {
           return {
               ...state,
               toolTipsVisible : true
           }
        }
        default: {
            return {
                ...state
            }
        }
    }
}
