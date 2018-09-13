const Api_Root='http://192.168.0.5:4000/etps/'
// add tags (param={content})
const add_Tag_Param_Url = Api_Root + 'tag/add/'
// delete tags (param = tagId)
const delete_Tags_Id_Url = Api_Root + 'tag/delete/'
// change tags by tagid (param = {tagid: ,tagcontent: })
const change_Tag_Id_Param_Url = Api_Root + 'tag/change/'
// select tagsall
const select_Tags_All_Url = Api_Root + 'tag/select'
// add events (content) 
const add_Event_Param_Url = Api_Root + 'event/add/'
// delete events (by id)
const delete_Event_Id_Url = Api_Root + 'event/delete/'
//change events (id content)
const change_Events_Id_Param_Url = Api_Root + 'event/change/'
// select events (tagids)
const select_Events_Tid_Url = Api_Root + 'event/select'

export default {
    add_Event_Param_Url,
    add_Tag_Param_Url,
    select_Events_Tid_Url,
    select_Tags_All_Url,
    delete_Event_Id_Url,
    delete_Tags_Id_Url,
    change_Events_Id_Param_Url,
    change_Tag_Id_Param_Url
}