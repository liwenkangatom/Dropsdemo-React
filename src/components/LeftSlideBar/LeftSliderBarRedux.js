// API

import api from '../../api'


// CONSTENT

    //  asyc
    const GET_TAGS_ALL = 'GET_TAGS_ALL'
    const GET_TAGS_ALL_SUCCESS = 'GET_TAGS_ALL_SUCCESS'
    const GET_TAGS_ALL_ERROR = 'GET_TAGS_ALL_ERROR'

    const ADD_TAG = 'ADD_TAG'
    const ADD_TAG_SUCCESS = 'ADD_TAG_SUCCESS'
    const ADD_TAG_ERROR = 'ADD_TAG_ERROR'

    const DELETE_TAG = 'DELETE_TAG'
    const DELETE_TAG_SUCCESS = 'DELETE_TAG_SUCCESS'
    const DELETE_TAG_ERROR = 'DELETE_TAG_SUCCESS'

    const RENAME_TAG = 'RENAME_TAG'
    const RENAME_TAG_SUCCESS = 'RENAME_TAG_SUCCESS'
    const RENAME_TAG_ERROR = 'RENAME_TAG_ERROR'

    //  sync
    const ONEXPAND = 'EXPAND'
    const ONSELECT = 'ONSELECT'
    const ONCHECK = 'ONCHECK'
    const ONCOLLAPSE = 'CNCOLLAPSE'
    const ONRIGHTCLICK = 'ONRIGHTCLICK'
    const ONCHANGE = 'ONCHANGE'
// ACTIONS  CREATOR
export function refreshtags() {
    return {
        url: api.select_Tags_All_Url,
        types: [GET_TAGS_ALL, GET_TAGS_ALL_SUCCESS, GET_TAGS_ALL_ERROR]
    }
}
export function addtag(name, parent) {
    return {
        url: api.add_Tag_Param_Url,
        types:[ ADD_TAG, ADD_TAG_SUCCESS, ADD_TAG_ERROR],
        params: {
            name: name,
            parent: parent
        }
    }
}
export function deletetag(id) {
    return {
        url: api.delete_Tags_Id_Url,
        types: [DELETE_TAG, DELETE_TAG_SUCCESS, DELETE_TAG_ERROR],
        params: {
            id: id
        }
    }
}
export function renametag(id, name){
    return {
        url: api.change_Tag_Id_Param_Url,
        type: [RENAME_TAG, RENAME_TAG_SUCCESS, RENAME_TAG_ERROR],
        params: {
            id: id,
            name: name
        }
    }
}

export function onExpand(expandedKeys){
    return {
        type: ONEXPAND,
        payload: {
            expandedKeys
        }
    }
}
export function onSelect(selectedKeys, info) {
    return {
        type: ONSELECT,
        payload: {
            selectedKeys,
            info
        }
    }
}
// 操作drops state 写在
export function onCheck(checkedKeys, info) {
    return {
        type: ONCHECK,
        payload: {
            checkedKeys,
            info
        }
    }
}
export function onCollapse(collapsed) {
    return {
        type: ONCOLLAPSE,
        payload: {
            collapsed
        }
    }
}
export function onRightClick(info) {
    return {
        type: ONRIGHTCLICK, 
        payload: {
            info
        }
    }
}
export function onChange(e, dataList) {
    return {
        type: ONCHANGE,
        payload: {
            e,
            dataList
        }
    }
}
// REDUCERS
const initState = {
    info:{},
    cmshow: false,

    checkedKeys: [],

    gData:[],

    dataList: [],
    collapsed: true,
    searchValue:'',
    expandedKeys: [],
    selectedKeys: [],
    autoExpandParent: true,
    error: false,
    loading: true
}

export default function LeftSlideBarReducer(state = initState, action) {
    switch(action.type){
        case ONEXPAND: {
            let expandedKeys = action.payload.expandedKeys
            return {
                ...state,
                expandedKeys,
                autoExpandParent: false
            }
        }
        case ONSELECT: {
            let selectedKeys = action.payload.selectedKeys
            return {
                ...state,
                selectedKeys
            }
        }
        case ONCHECK: {
            let checkedKeys = action.payload.checkedKeys
            return {
                ...state,
                checkedKeys
            }
        }
        case ONCOLLAPSE: {
            return {
                ...state,
                collapsed: action.payload.collapsed
            }
        }
        case ONRIGHTCLICK: {
            let info = action.payload.info
            return {
                ...state,
                selectedKeys:[info.node.props.eventKey],
                info,
                cmshow: true,
            }
        }
        case ONCHANGE: {
            const e = action.payload.e
            const dataList = action.payload.dataList
            const value = e.target.value
            const expandedKeys = dataList.map(
                (item) => {
                    if (item.title.indexOf(value) > -1) {
                        // return getParentKey(item.key, gData);
                    }
                    return null;
                }
            ).filter((item, i, self) => item && self.indexOf(item) === i)
            return {
                ...state,
                expandedKeys,
                searchValue: value,
                autoExpandParent: true
            }
        }
        case GET_TAGS_ALL: {
            return {
                ...state,
                error: false,
                loading: true
            }
        }
        case GET_TAGS_ALL_SUCCESS: {
            return {
                ...state,
                error: false,
                loading: false,
                gData: action.payload
            }
        }
        case GET_TAGS_ALL_ERROR: {
            return {
                ...state,
                error: true,
                loading: false
            }
        }
        case RENAME_TAG: {
            return {
                ...state,
                error: false,
                loading: true
            }
        }
        case RENAME_TAG_SUCCESS: {
            return {
                ...state,
                error: false,
                loading: false,
                gData: action.payload
            }
        }
        case RENAME_TAG_ERROR: {
            return {
                ...state,
                error: true,
                loading: false
            }
        }
        case DELETE_TAG: {
            return {
                ...state,
                error: false,
                loading: true
            }
        }
        case DELETE_TAG_SUCCESS: {
            return {
                ...state,
                error: false,
                loading: false,
                gData: action.payload
            }
        }
        case DELETE_TAG_ERROR: {
            return {
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