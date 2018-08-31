// api
import api from '../../api'
// CONTENT
const ADD_EVENT = 'ADD_EVENT'
// ACTION CREATOR
export function addEventAction(param) {
    return {
        url: api.change_Events_Id_Param_Url,
        types: [ADD_EVENT]
    }
}
// REDUCER
const initState = {
    data: []
}
export default function EventReducer(state = initState, action) {
    switch(action.type) {
        case ADD_EVENT: {
            return {
                ...state,
                data: action.payload
            }
        }
        default: {
            return state
        }
    }
}