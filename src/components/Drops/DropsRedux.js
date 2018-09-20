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

const UPLOAD_TAG_EVENT = 'UPLOAD_TAG_EVENT'
const UPLOAD_TAG_EVENT_SUCCESS = 'UPLOAD_TAG_EVENT_SUCCESS'
const UPLOAD_TAG_EVENT_ERROR = 'UPLOAD_TAG_EVENT_ERROR'

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

const GET_EVENTINDEX = 'GET_EVENTINDEX'
const ADD_ADDCOMMITS = 'ADD_ADDCOMMITS'

// ACTION CREATOR
export const getInitEventRedux = () =>{ 
    return {
        url: api.select_Events_Tid_Url,
        // url: 'api/data.json',
        types:[INIT_EVENT_REDUX,INIT_EVENT_REDUX_SUCCESS,INIT_EVENT_REDUX_ERROR], 
    }
}

export const uploadTagEvent = (data, eventtag, gData) =>{
    return {
        url: api.add_Event_Param_Url,
        types:[UPLOAD_TAG_EVENT,UPLOAD_TAG_EVENT_SUCCESS,UPLOAD_TAG_EVENT_ERROR],
        params: {
            data,
            eventtag,
            gData
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
        params: {
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


export const addEventAction = (tagkey, commits) => {
    return {
        type: ADD_EVENT_SUCCESS,
        params: {
            tagkey,
            commits
        }
    }
} 


export const reAddCommits = () => {
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


export const getEventIndex = (eventindex) => {
    return {
        type: GET_EVENTINDEX,
        param: {
            eventindex
        }
    }
}

export const addAddCommits = () => {
    return {
        type: ADD_ADDCOMMITS,
    }
}


// REDUCER
const initState = {
    data: [],
    eventtag: [],
    addtags:[],
    addcommits:[{
        key:'',
        subject:'',
        content:'',
        date:'',
    }],
    eventindex: 0,
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
            const commits = action.params.commits;
            commits.forEach(commit => {
                const eventtagitem = {
                    key: new Date().getTime(),
                    eventkey: commit.key,
                    tagkey: tagkey,
                }
                newState.eventtag.push(eventtagitem);
            })

            commits.forEach(commit => {
                newState.data.push(commit);
            })
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
            // console.log(action)
            let data = []
            const result = action.payload.data
            for (const event of result) {
                let tmp = {}
                tmp.key = event.pKey
                tmp.subject = event.Subject
                tmp.content = event.Content
                tmp.date = event.DT
                data.push(tmp)
            }
            const etag = action.payload.eventtag
            let eventtag = []
            for (const et of etag) {
                let tmp = {}
                tmp.key = et.pKey
                tmp.eventkey = et.ms_EventpKey
                tmp.tagkey = et.ms_TagpKey
                eventtag.push(tmp)
            }

            return {
                ...state,
                data,
                eventtag,
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
            const { addcommits, eventindex } = newState;
            addcommits[eventindex].date = action.param.time
            return newState;
        }

        case GET_CHANGE_TIME: {
            const newState = JSON.parse(JSON.stringify(state));
            newState.changecommit.date = action.param.time;
            return newState;
        }

        case GET_ADD_SUBJECT: {
            const newState = JSON.parse(JSON.stringify(state));
            const { addcommits, eventindex } = newState;
            const { subject, key } = action.params
            addcommits[eventindex].subject = subject;
            addcommits[eventindex].key = key;
            return newState;
        }

        case GET_CHANGE_SUBJECT: {
            const newState = JSON.parse(JSON.stringify(state));
            newState.changecommit.subject = action.param.subject;
            return newState;
        }

        case GET_ADD_CONTENT: {
            const newState = JSON.parse(JSON.stringify(state));
            const { addcommits, eventindex } = newState;
            addcommits[eventindex].content = action.param.content
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
                eventindex:0,
                addtags:[],
                addcommits:[{
                    key:'',
                    subject:'',
                    content:'',
                    date:'',
                }]
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
                if(item.eventkey != commit.key){
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

        case ADD_ADDCOMMITS: {
            const newState = JSON.parse(JSON.stringify(state));
            const obj = {
                key:'',
                subject:'',
                content:'',
                date:'',
            };
            newState.addcommits.push(obj);
            return newState;
        }

        case GET_EVENTINDEX: {
            const { eventindex } = action.param;
            return {
                ...state,
                eventindex
            }
        }
        
        case UPLOAD_TAG_EVENT: {
            return {
                ...state,
                loading: true,
                error: false,
            }
        }

        case UPLOAD_TAG_EVENT_SUCCESS: {
            return {
                ...state,
                loading: false,
                error: false,
            }
        }

        case UPLOAD_TAG_EVENT_ERROR: {
            return {
                ...state,
                loading: false,
                error: true,
            }
        }
        default: {
            return state
        }
    }
}