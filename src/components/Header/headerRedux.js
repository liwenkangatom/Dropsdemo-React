export const VISIT_NUM= 'VISIT_NUM'
export const countvisit = () => ({
  type: VISIT_NUM
})
const initialState = {
  visitnum : 0
}

export default (state = initialState, action) => {
  switch (action.type) {

  case VISIT_NUM:
    return { 
      ...state,
      visitnum: state.visitnum++
    }

  default:
    return state
  }
}
