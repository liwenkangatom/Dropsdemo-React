const initialState = {
    events: [],
    loading: true,
    error: false
}

// CONSTANTS
const LOAD_EVENTS = 'LOAD_EVENTS'
const LOAD_EVENTS_SUCCESS = 'LOAD_EVENTS_SUCCESS'
const LOAD_EVENTS_ERROR = 'LOAD_EVENTS_ERROR'

const apiUrl = 'locahttp://localhost:4000/etps/tagsall'

// ACTION CREATOR
export function loadEvents() {
    console.log('进入action creator')
    return {
        url: apiUrl,
        types: [LOAD_EVENTS, LOAD_EVENTS_SUCCESS, LOAD_EVENTS_ERROR]
    }
}

// REDUCER
export default function TableReducer(state = initialState, action) {
    switch (action.type) {
        case 'CHANGE_QUERY': {
            return {
                ...state,
                query: action.payload.query
            }
        }
        case 'LOAD_EVNETS': {
            return {
                ...state,
                loading: true,
                error: false
            }
        }
        case 'LOAD_EVENTS_SUCCESS': {
            return {
                ...state,
                events: action.payload,
                loading: false,
                error: false
            }
        }
        case 'LOAD_EVENTS_ERROR': {
            return {
                ...state,
                loading: false,
                error: true
            }
        }
        default:
            return state
    }
}