
// CONSTENTS
const DISPLAY_MODAL = 'DISPLAY_MODAL'
const DESTROY_MODAL = 'DESTROY_MODAL'
// ACTION CREATOR
export function ModalActionCreator() {
    return {
        type: DISPLAY_MODAL
    }
}
// REDUCER
const initState = {
    modalVisible: true
}
export default function ModalReducer(state = initState, Action) {
    switch (Action.type) {
        case DISPLAY_MODAL: {
            return {
                ...state,
                modalVisible: false
            }
        }
        case DESTROY_MODAL: {
           return {
               ...state,
               modalVisible: true
           }
        }
        default: {
            return {
                ...state
            }
        }
    }
}