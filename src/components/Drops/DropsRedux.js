// api
import api from '../../api'
// CONTENT

const INIT_EVENT_REDUX = 'INIT_EVENT_REDUX'
const INIT_EVENT_REDUX_SUCCESS = 'INIT_EVENT_REDUX_SUCCESS'
const INIT_EVENT_REDUX_ERROR = 'INIT_EVENT_REDUX_ERROR'

const ADD_EVENT = 'ADD_EVENT'
const ADD_EVENT_SUCCESS = 'ADD_EVENT_SUCCESS'
const ADD_EVENT_ERROR = 'ADD_EVENT_ERROR'

const CHANGE_EVENT = 'CHANGE_EVENT'
const CHANGE_EVENT_SUCCESS = 'CHANGE_EVENT_SUCCESS'
const CHANGE_EVENT_ERROR = 'CHANGE_EVENT_ERROR'

const DELETE_EVENT = 'DELETE_EVENT'
const DELETE_EVENT_SUCCESS = 'DELETE_EVENT_SUCCESS'
const DELETE_EVENT_ERROR = 'DELETE_EVENT_ERROR'

const GET_ADD_TAGS = 'GET_ADD_TAGS'
const GET_ADD_TIME = 'GET_ADD_TIME'
const GET_ADD_SUBJECT = 'GET_ADD_SUBJECT'
const GET_ADD_CONTENT = 'GET_ADD_CONTENT'
const READDCOMMIT = 'READDCOMMIT'
const GET_SHOW_COMMIT = 'GET_SHOW_COMMIT'
const GET_SHOW_TAGS = 'GET_SHOW_TAGS'
const GET_CHANGE_TIME = 'GET_CHANGE_TIME'
const GET_CHANGE_SUBJECT = 'GET_CHANGE_SUBJECT'
const GET_CHANGE_CONTENT = 'GET_CHANGE_CONTENT'
const GET_CHANGE_KEY = 'GET_CHANGE_KEY'

// ACTION CREATOR
export const getInitEventRedux = (gData,data,eventtag) =>{ 
    return{
        type:INIT_EVENT_REDUX_SUCCESS,  
        params:{
            gData,
            data,
            eventtag
        }
    }
}

export const getAddEventTags = (tags) => {
    return {
        type: GET_ADD_TAGS,
        param: {
            tags
        }
    }
}

export const getAddEventTime = (time) => {
    return {
        type: GET_ADD_TIME,
        param: {
            time
        }
    }
}

export const getAddEventSubject = (subject,key) => {
    return {
        type: GET_ADD_SUBJECT,
        param: {
            subject,
            key
        }
    }
}

export const getAddEventContent = (content) => {
    return {
        type: GET_ADD_CONTENT,
        param: {
            content
        }
    }
}

export const addEventAction = (tagkey, commit) => {
    return {
        type: ADD_EVENT_SUCCESS,
        params: {
            tagkey,
            commit
        }
    }
} 

export const reAddCommit = () => {
    return {
        type: READDCOMMIT,
    }
}

export const getShowCommit = (commit) => {
    return {
        type: GET_SHOW_COMMIT,
        param:{
            commit
        }
    }
}

export const getShowTags = (tags) => {
    return {
        type: GET_SHOW_TAGS,
        param:{
            tags
        }
    }
}

export const getChangeTime = (time) => {
    return {
        type: GET_CHANGE_TIME,
        param: {
            time
        }
    }
}

export const getChangeSubject = (subject) => {
    return {
        type: GET_CHANGE_SUBJECT,
        param: {
            subject
        }
    }
}

export const getChangeContent = (content) => {
    return {
            type: GET_CHANGE_CONTENT,
            param: {
                content
            }
    }
}

export const getChangeKey = (eventkey) => {
    return {
        type: GET_CHANGE_KEY,
        param: {
            eventkey
        }
    }
}

export const changeCommit = (changecommit, showtags) => {
    return {
        type: CHANGE_EVENT_SUCCESS,
        param: {
            changecommit,
            showtags
        }
    }
}

export const deleteEvent = (eventkey) => {
    return {
        type: DELETE_EVENT_SUCCESS,
        param: {
            eventkey
        }
    }
}
/* 

export const getInitEventRedux = (gData,data) =>{ 
    return{
        type:[INIT_EVENT_REDUX, INIT_EVENT_REDUX_ERROR, INIT_EVENT_REDUX_SUCCESS],  
        params:{
            gData,
            data，
            eventtag,
        }
    }
}

export const changeCommit = (changecommit, showtags) => {
    return {
        type: [CHANGE_EVENT,CHANGE_EVENT_SUCCESS,CHANGE_EVENT_ERROR],
        param: {
            changecommit,
            showtags
        }
    }
}

export function addEventAction(name,commits) {
    return {
        url: api.change_Events_Id_Param_Url,
        types:[ ADD_EVENT, ADD_EVENT_SUCCESS, ADD_EVENT_ERROR],
        params: {
            name: name,
            commits: commits
        }
    }
}

export const deleteEvent = (eventkey) => {
    return {
        types: [DELETE_EVENT_SUCCESS, DELETE_EVENT, DELETE_EVENT_ERROR],
        param: {
            eventkey
        }
    }
}

 */


// REDUCER
const initState = {
    gData: [],
    data: [],
    eventtag: [],
    addtags:[],  
    addcommit:{
        key:'',
        subject:'',
        content:'',
        date:'',
    }, 
    selectedKeys: ["0","0-1","0-2"],
    showcommit:{
        key:'',
        subject:'',
        content:'',
        date:'',
    },
    showtags:[],
    changecommit:{
        key:'',
        subject:'',
        content:'',
        date:'',
    },
    error: false,
    loading: true 
}
export default function EventReducer(state = initState, action) {
    switch(action.type) {
        case ADD_EVENT_SUCCESS: {
            const newState = JSON.parse(JSON.stringify(state));
            const tagkey = action.params.tagkey;
            const commit = action.params.commit;
            const eventtagitem = {
                key: tagkey + commit.key,
                eventkey: commit.key,
                tagkey: tagkey,
            }
            newState.eventtag.push(eventtagitem);
            if(newState.data.every(item => JSON.stringify(item) !== JSON.stringify(commit))){
                newState.data.push(commit);
            }
            return newState;
        }

        case ADD_EVENT: {
            return {
                ...state,
                error: false,
                loading: true,
            }
        }

        case ADD_EVENT_ERROR: {
            return {
                ...state,
                error: true,
                loading: false,
            }
        }

        case INIT_EVENT_REDUX: {
            return {
                ...state,
                error: false,
                loading: true,
            }
        }

        case INIT_EVENT_REDUX_SUCCESS: {
            return {
                ...state,
                gData: action.params.gData,
                data: action.params.data,
                eventtag: action.params.eventtag,
                error: false,
                loading: false,
            }
        }

        case INIT_EVENT_REDUX_ERROR: {
            return {
                ...state,
                error: true,
                loading: false
            }
        }

        case GET_ADD_TAGS: {
            return {
                ...state,
                addtags: action.param.tags
            }
        }

        case GET_ADD_TIME: {
            const newState = JSON.parse(JSON.stringify(state));
            newState.addcommit.date = action.param.time;
            return newState;
        }

        case GET_CHANGE_TIME: {
            const newState = JSON.parse(JSON.stringify(state));
            newState.changecommit.date = action.param.time;
            return newState;
        }

        case GET_ADD_SUBJECT: {
            const newState = JSON.parse(JSON.stringify(state));
            newState.addcommit.subject = action.param.subject;
            newState.addcommit.key = action.param.key;
            return newState;
        }

        case GET_CHANGE_SUBJECT: {
            const newState = JSON.parse(JSON.stringify(state));
            newState.changecommit.subject = action.param.subject;
            return newState;
        }

        case GET_ADD_CONTENT: {
            const newState = JSON.parse(JSON.stringify(state));
            newState.addcommit.content = action.param.content;
            return newState;
        }

        case GET_CHANGE_CONTENT: {
            const newState = JSON.parse(JSON.stringify(state));
            newState.changecommit.content = action.param.content;
            return newState;
        }

        case GET_CHANGE_KEY:{

            const newState = JSON.parse(JSON.stringify(state));
            newState.changecommit.key = action.param.eventkey;
            return newState;
        }

        case READDCOMMIT: {
            return {
                ...state,
                addtags:[],
                addcommit:{
                    subject:'',
                    content:'',
                    date:'',
                }
            }
        }

        case GET_SHOW_COMMIT: {
            return{
                ...state,
                showcommit: action.param.commit
            }
        }

        case GET_SHOW_TAGS:{
            return {
                ...state,
                showtags: action.param.tags
            }
        }

        case CHANGE_EVENT_SUCCESS: {
            const newState = JSON.parse(JSON.stringify(state));
            const showtags = action.param.showtags;
            const commit = action.param.changecommit;
            let data = [];
            let list = [];
            newState.eventtag.forEach((item) => {
                if(item.eventkey !== commit.key){
                    list.push(item);
                }
            })
            newState.eventtag = list;
            showtags.forEach((item) => {
                newState.eventtag.push({
                    key: commit.key + "-" + item,
                    eventkey: commit.key,
                    tagkey: item
                })   
            })

            newState.loading = false;
            newState.error = false;
            newState.data.forEach((item) => {
                if(item.key === commit.key) {
                    data.push(commit);
                } else {
                    data.push(item);
                }
            })
            newState.data = data;
            return newState;      
        }

        case CHANGE_EVENT: {
            return{
                ...state,
                loading: true,
                error: false
            }
        }
        
        case CHANGE_EVENT_ERROR:{
            return{
                ...state,
                error: true,
                loading: false
            }
        }
        
        case DELETE_EVENT_SUCCESS:{
            const newState = JSON.parse(JSON.stringify(state));
            const eventkey = action.param.eventkey;
            let list = [];
            newState.eventtag.forEach((item) => {
                if(item.eventkey !== eventkey){
                    list.push(item);
                }
            })
            newState.eventtag = list;
            let list2 = [];
            newState.data.forEach((item) => {
                if(item.key !== eventkey){
                    list2.push(item);
                }
            })
            newState.data = list2;
            return newState;
        }

        case DELETE_EVENT: {
            return{
                ...state,
                loading: true,
                error: false
            }
        }
        
        case DELETE_EVENT_ERROR:{
            return{
                ...state,
                error: true,
                loading: false
            }
        }

        default: {
            return state
        }
    }
}