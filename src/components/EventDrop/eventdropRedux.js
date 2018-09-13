export const SHOW_EVENT_COMPONENT = 'SHOW_EVENT_COMPONENT'

export const lightup = () => ({
  type: SHOW_EVENT_COMPONENT
})

const initialState = {
  eventshow: false
}

export default (state = initialState, action) => {
  switch (action.type) {

  case SHOW_EVENT_COMPONENT:
    return {
       ...state,
       eventshow: true
       }

  default:
    return state
  }
}
