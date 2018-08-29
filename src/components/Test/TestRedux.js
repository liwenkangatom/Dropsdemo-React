// CONTANTS
const TEST_ACTION = 'TEST_ACTION'
const TEST_DELET = 'TEST_DELET'
// ACTION CREATOR
export function testActionCreator(){
    return {
        type: TEST_ACTION
    }
}
export function testActionDelete(){
    return {
        type: TEST_DELET
    }
}
// REDUCER
const initState = {
    testValue: 0
}
export default function TestReducer(state = initState, Action) {
    switch(Action.type) {
        case TEST_ACTION: {
            return {
                ...state,
                testValue: 1
            }
        }
        case TEST_DELET: {
            return {
                ...state,
                testValue: 2
            }
        }
        default: {
            return{
                ...state
            }
        }
    }
}
