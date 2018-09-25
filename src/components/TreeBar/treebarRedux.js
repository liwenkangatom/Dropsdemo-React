import api from '../../api'


// CONSTENT

    //  asyc
    const GET_TAGS_ALL = 'GET_TAGS_ALL'
    const GET_TAGS_ALL_SUCCESS = 'GET_TAGS_ALL_SUCCESS'
    const GET_TAGS_ALL_ERROR = 'GET_TAGS_ALL_ERROR'
    const SET_SIDER = 'SET_SIDER'
    // const ADD_TAG = 'ADD_TAG'
    // const ADD_TAG_SUCCESS = 'ADD_TAG_SUCCESS'
    // const ADD_TAG_ERROR = 'ADD_TAG_ERROR'

    // const DELETE_TAG = 'DELETE_TAG'
    // const DELETE_TAG_SUCCESS = 'DELETE_TAG_SUCCESS'
    // const DELETE_TAG_ERROR = 'DELETE_TAG_SUCCESS'

    // const RENAME_TAG = 'RENAME_TAG'
    // const RENAME_TAG_SUCCESS = 'RENAME_TAG_SUCCESS'
    // const RENAME_TAG_ERROR = 'RENAME_TAG_ERROR'
    const CONFIRM = 'CONFIRM'
    const CONFIRM_SUCCESS = 'CONFIRM_SUCCESS' 
    const CONFIRM_ERROR = 'CONFIRM_ERROR'
    //  sync
    // const ONEXPAND = 'EXPAND'
    const ONSELECT = 'ONSELECT'
    // const ONCHECK = 'ONCHECK'
    // const ONCOLLAPSE = 'CNCOLLAPSE'
    // const ONRIGHTCLICK = 'ONRIGHTCLICK'
    // const ONCHANGE = 'ONCHANGE'
// ACTIONS  CREATOR
export function initTags() {
    console.log('refreshs')
    return {
        url: api.select_Tags_All_Url,
        types: [GET_TAGS_ALL, GET_TAGS_ALL_SUCCESS, GET_TAGS_ALL_ERROR]
    }
}
export const confirmTags = (data) => ({
    url: api.confirm_Tags_Url,
    types: [CONFIRM, CONFIRM_SUCCESS, CONFIRM_ERROR],
    payload: data
})

// export function addtag(name, parent) {
//     console.log('addtag')
//     return {
//         url: api.add_Tag_Param_Url,
//         types:[ ADD_TAG, ADD_TAG_SUCCESS, ADD_TAG_ERROR],
//         params: {
//             name: name,
//             parent: parent
//         }
//     }
// }
// export function deletetag(id) {
//     return {
//         url: api.delete_Tags_Id_Url,
//         types: [DELETE_TAG, DELETE_TAG_SUCCESS, DELETE_TAG_ERROR],
//         params: {
//             id: id
//         }
//     }
// }
// export function renametag(id, name){
//     // console.log(id,name)
//     return {
//         url: api.change_Tag_Id_Param_Url,
//         types: [RENAME_TAG, RENAME_TAG_SUCCESS, RENAME_TAG_ERROR],
//         params: {
//             id: id,
//             name: name
//         }
//     }
// }

// export function onExpand(expandedKeys){
//     return {
//         type: ONEXPAND,
//         payload: {
//             expandedKeys
//         }
//     }
// }
export function selectTags(selectedKeys, info) {
    console.log('reducer',selectedKeys)
    return {
        type: ONSELECT,
        payload: {
            selectedKeys,
            info
        }
    }
}
export function setsider(siderwidth) {
    console.log('setsider', siderwidth)
    return { 
        type: SET_SIDER,
        payload: {
            siderwidth
        }
    }
}
// 操作drops state 写在
// export function onCheck(checkedKeys, info) {
//     return {
//         type: ONCHECK,
//         payload: {
//             checkedKeys,
//             info
//         }
//     }
// }
// export function onCollapse(collapsed) {
//     return {
//         type: ONCOLLAPSE,
//         payload: {
//             collapsed
//         }
//     }
// }
// export function onRightClick(info) {
//     return {
//         type: ONRIGHTCLICK, 
//         payload: {
//             info
//         }
//     }
// }
// export function onChange(e, dataList) {
//     return {
//         type: ONCHANGE,
//         payload: {
//             e,
//             dataList
//         }
//     }
// }
// REDUCERS
const initState = {
    selectedKeys: [
    
    ],
    gData:[
      ],
    error: false,
    loading: true,
    siderwidth: 200,
}

export default function LeftSlideBarReducer(state = initState, action) {
    
    switch(action.type){

        case ONSELECT: {
            let selectedKeys = action.payload.selectedKeys
            console.log(selectedKeys)
            return {
                ...state,
                selectedKeys
            }
        }
        case GET_TAGS_ALL: {
            console.log('getTaging')
            return {
                ...state,
                error: false,
                loading: true
            }
        }
        case GET_TAGS_ALL_SUCCESS: {
            let data = action.payload
            let gData = []
            if (data) {
                for (const item of data) {
                let tag = {}
                tag.key = item.pKey
                tag.title = item.Name
                tag.pid = item.ms_TagKey_Parent
                gData.push(tag)
            }
            }
            
            return {
                ...state,
                error: false,
                loading: false,
                gData
            }
        }
        case GET_TAGS_ALL_ERROR: {
            return {
                ...state,
                error: true,
                loading: false
            }
        }
        case CONFIRM: {
            return {
                ...state,
                error: false,
                loading: true
            }
        }
        case CONFIRM_SUCCESS: {
            return {
                ...state,
                error: false,
                loading: false
            }
        }
        case CONFIRM_ERROR: {
            return {
                ...state,
                error: true,
                loading: false
            }
        }
        case SET_SIDER: {
            let siderwidth = action.payload.siderwidth
            return {
                ...state,
                siderwidth: siderwidth
            }
        }
        // case RENAME_TAG: {
        //     return {
        //         ...state,
        //         error: false,
        //         loading: true
        //     }
        // }
        // case RENAME_TAG_SUCCESS: {
        //     return {
        //         ...state,
        //         error: false,
        //         loading: false,
        //         gData: action.payload
        //     }
        // }
        // case RENAME_TAG_ERROR: {
        //     return {
        //         ...state,
        //         error: true,
        //         loading: false
        //     }
        // }
        // case DELETE_TAG: {
        //     return {
        //         ...state,
        //         error: false,
        //         loading: true
        //     }
        // }
        // case DELETE_TAG_SUCCESS: {
        //     return {
        //         ...state,
        //         error: false,
        //         loading: false,
        //         gData: action.payload
        //     }
        // }
        // case DELETE_TAG_ERROR: {
        //     return {
        //         ...state,
        //         error: true,
        //         loading: false
        //     }
        // }
        default: {
            return state 
        }
    }
}