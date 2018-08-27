const defaultState = {
    data: []
}
export default (state = defaultState, action) =>{
    if(action.type === 'init_redux') {
        const newState = JSON.parse(JSON.stringify(state));
        newState.data = action.data;
        
        return newState;
    }
    return state;
}