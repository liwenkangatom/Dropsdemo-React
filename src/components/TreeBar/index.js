import React, { Component } from 'react'
// import PropTypes from 'prop-types'

import { Layout, Icon, Tree, Input, Modal, Button} from 'antd';
import 'antd/dist/antd.css';
import {actions} from '../../redux'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { Search, 
  SearchWrapper,
  Tags,
  Text,
  Add
} from './style'
import './treebar.css'

import { ContextMenu, MenuItem , ContextMenuTrigger} from 'react-contextmenu'
import { setsider } from './treebarRedux';
import LayoutContent from './LayoutContent';

const {Sider, Content, Header} = Layout
const confirm = Modal.confirm;
const TreeNode = Tree.TreeNode;

const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};
const deepCopy = (obj) => {
    if(typeof obj != 'object'){
        return obj;
    }
    var newobj = {};
    for ( var attr in obj) {
        newobj[attr] = deepCopy(obj[attr]);
    }
    return newobj;
}
// key, pid, child
const transData=(b) =>{
  // 参数断开引用
  let a = []
  for(let k in b) {
    a[k] = deepCopy(b[k])
  }
 
  let r = [], hash = {}
  for (let i in a) {
      hash[(a[i].key)] = a[i];
  }
  for (let j in a) {
      let aVal = a[j]
      let hashVP = hash[aVal.pid];
      if (hashVP) {
          // !hashVP[children] && (hashVP[children] = []);
          if(!hashVP.children) hashVP.children = []
          hashVP.children.push(aVal);
      } else {
          r.push(aVal);
      }
  }
  return r;
}
class TreeBar extends Component {

  constructor(props) {
    super(props);
    this.state={
      data: [],
      dataList: [],
      treeData: [],

      selectedKey: 0,
      collapsed: true,
      siderwidth: 200,
      searchValue: '',

      addkey: '',
      changekey: '',
      temptagkey: '',
      rightclickkey: '',
      addroot: false,

      expandedKeys: [],
      autoExpandParent: true,
      selectedKeys:[],
      collapsed: false,
      renamevalue: '',
      addvalue: '',
      addrootvalue:'',
      confirmVisible: false
    }
  }
onExpandHandle = (expandedKeys) => {
  this.exitEdit
  this.setState({
    expandedKeys,
    autoExpandParent: false,
  });
}
onSelectHandle = (selectedKeys, info) => {
  console.log('selected', selectedKeys, info);

}

onCheckHandle = (checkedKeys, info) => {
  this.exitEdit
  console.log(checkedKeys); 
  this.props.selectTags(checkedKeys.checked)
   this.setState({
    selectedKeys: checkedKeys.checked
  })
  // this.props.onSelect(checkedKeys.checked, info)
}

onCollapseHandle = (collapsed) => {
  this.setState({ collapsed });
}
onchangeHandle = (e) => {
  
    const value = e.target.value;
    // const expandedKeys = this.dataList.map((item) => {
    //   if (item.title.indexOf(value) > -1) {
    //     return getParentKey(item.key, this.state.data);
    //   }
    //   return null;
    // }).filter((item, i, self) => item && self.indexOf(item) === i);
    const tree = this.state.data
    let expandedKeys = []
    expandedKeys = tree.map((item) => {
      if(item.title.toLowerCase().indexOf(value.toLowerCase()) > -1 ) {
        return item.pid+''
      }
      return null
    }).filter((value, index, self)=> value && self.indexOf(value.toLowerCase()) === index)
    console.log(expandedKeys)
    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true,
    });
    
  }
// 收起面板
  toggle = () => {
    console.log(this.state.siderwidth)
    this.props.setsider(!this.state.collapsed?0:this.state.siderwidth)
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
// 删除请求确认
  showDeleteConfirm = () => {
    const ref= this
    confirm({
      title: 'Are you sure delete this Tag?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk(){
        ref.deleteaction()
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  addhandle = () => {
    let expandedKeys = []
    expandedKeys = this.state.expandedKeys.concat()
    let key = (this.state.rightclickkey)+''
    expandedKeys.push(key)

    this.setState({
      addkey: this.state.rightclickkey,
      changekey: '',
      addroot: false,
      expandedKeys
    })
  }

  changehandle = () => {
    this.setState({
      changekey: this.state.rightclickkey,
      addkey: '',
      addroot: false
    })
  }

  deletehandle = () => {
    this.showDeleteConfirm
  }

  addRootTag = () => {
    this.setState({
      addroot: true,
      addkey: '',
      changekey: ''
    })
  }
  exitEdit = () => {
    this.setState({
      addroot: false,
      addkey: '',
      changekey: ''
    })
  }
  checkvalue = (inputvalue) => {
    console.log(inputvalue)
    let tree = this.state.data
    if(inputvalue){
      for(let k in tree) {
        console.log(tree[k].title)
        if(tree[k].title === inputvalue) {
          Modal.info({
          title:'ERROR',
          content:'Duplicate Tag'
        })
          return false
        }
      }
      return true
  }else return false
  }
  addaction=()=>{
    let title = this.state.addvalue
    if(this.checkvalue(title)){
      let pid = this.state.rightclickkey
      let date = new Date()
      let key = date.getTime()
      
      let node = {key, title, pid}
      let data = this.state.data
      data.push(node)
      
      let treeData = transData(data)
      this.setState({
        data,
        treeData,
        addkey: '',
        addvalue:''
      })
    }else{
      this.setState({
        addkey: '',
        addvalue: '',
        inputerror: true
      })
      
    }
    // this.setState({
    //   treeData
    // })
    // this.setState({addkey: ''},this.props.addTag(this.state.addvalue, this.state.rightclickkey))
    // this.props.initTags()
    // this.setState({data: this.props.gData},()=>{
    //   this.generateList(this.state.data)
    // })
    // this.setState({dataList: this.dataList})
  }

  addrootaction = ()=>{
    let title = this.state.addvalue

    if(this.checkvalue(title)) {
      let pid = null
      let date = new Date()
      let key = date.getTime()
      let title = this.state.addvalue

      let node = {key, title, pid}
      let data = this.state.data
      data.push(node)
      console.log(this.state)
      let treeData = transData(data)
      this.setState({
        data,
        treeData,
        addroot: false,
        addvalue:''
      })
    }else{
      this.setState({
        addroot: false,
        addvalue: '',
        inputerror: true
      })
    }
  }
  addinputchange=(e)=>{
    this.setState({addvalue: e.target.value})
  }
  renameaction=()=>{

    let title = this.state.renamevalue
    if(this.checkvalue(title)){
      let data =this.state.data
      let key = this.state.rightclickkey
      
      for (let k in data) {
        if(data[k].key === key){
          data[k].title = title
        }
      }
      let treeData = transData(data)
      this.setState({
        data,
        treeData,
        changekey: '',
        renamevalue: ''
      }, console.log(this.state))
    }else{
      this.setState({
        changekey: '',
        renamevalue: '',
        inputerror: true
      })
    }

    

    // this.setState({changekey:''},this.props.renameTag(this.state.rightclickkey, this.state.renamevalue))
    // this.props.initTags()
    // this.setState({data: this.props.gData},()=>{
    //   this.generateList(this.state.data)
    // })
    // this.setState({dataList: this.dataList})
  }
  renameinputchange=(e) => {
    this.setState({renamevalue: e.target.value})
    
  }
  deleteaction=()=>{
    let data = this.state.data
    let key = this.state.rightclickkey
    let pid = null
    for(let k in data){
      if(data[k].key === key){
        pid = data[k].pid
        data.splice(k,1)
      }
      if(data[k].pid === key) {
        data[k].pid = pid
      }
    }
    let treeData = transData(data)
    this.setState({
      data,
      treeData
    })
    // this.props.deleteTag(this.state.rightclickkey)
    // this.props.initTags()
    // this.setState({data: this.props.gData},()=>{
    //   this.generateList(this.state.data)
    // })
    // this.setState({dataList: this.dataList})
  }
  showModal=()=> {
    this.setState({
      confirmVisible: true
    });
  }
  handleOk=() =>{
    this.setState({
      ModalText: 'Confirming Changes',
      confirmLoading: true
    });
    setTimeout(() => {
      this.setState({
        confirmVisible: false,
        confirmLoading: false
      });
    }, 2000);
  }
  handleCancel=() =>{
    
    this.setState({
      visible: false
    });
  }
  confirmChangeAction = () => {
    let data = this.state.data
    this.props.confirmtag(data)
    this.initTagsAction
  }
  initTagsAction = () => {
    
  }
  // componentWillMount() {
    

  
    
    
  //   // this.setState({
  //   //   treeData
  //   // })
  //   // this.props.initTags(
  //   // this.setState({data: this.props.gData},()=>{
  //     // this.generateList(this.state.treeData)
  //   // })
  //   // this.setState({dataList: this.dataList})
    
  // }
  
  componentDidMount() {
    this.props.initTags()
    
  }
  
  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    const data = nextProps.gData
    console.log(data)
    this.setState({
      data
    }, ()=> {console.log(this.state.data)})
    let treeData = transData(data)
    this.setState({
      treeData
    })
  }
  
 
  
  
  render() {
    const { collapsed, siderwidth , addkey, changekey, tmptagkey} = this.state
    const { searchValue, expandedKeys, autoExpandParent, addroot, selectedKeys} = this.state
    const { renamevalue, addvalue } = this.state

    let titlecreator = (item) =>
      <ContextMenuTrigger  id="some_unique_identifier" 
        collect={()=>{this.setState({rightclickkey:item.key})}} >
          <div className="well" onDoubleClick={()=>{
              this.setState({rightclickkey: item.key
              },()=>{this.changehandle()})}} >
            {item.title}
          </div>
      </ContextMenuTrigger>

    const loop = data => data.map((item) => {
      const index = item.title.indexOf(searchValue)
      const beforeStr = item.title.substr(0, index)
      const afterStr = item.title.substr(index + searchValue.length)
      const title = index > -1 ? (
        <span>
          <ContextMenuTrigger    id="some_unique_identifier" 
            collect={()=>{this.setState({rightclickkey:item.key,addkey: '', addRootTag: false, changekey: ''
            })}}>
          <div  onDoubleClick={()=>{
            this.setState({rightclickkey: item.key},()=>{
              this.changehandle()}
          )}}>
              {beforeStr}
              <span style={{ color: '#f50' }}>{searchValue}</span>
              {afterStr}
          </div>
          </ContextMenuTrigger>
        </span>) : <span>{titlecreator(item)}</span>;
      if (item.children) {
        return (
          <TreeNode key={item.key}  title=
          {
            (item.key == changekey)?
              <Input 
                onPressEnter={this.renameaction}
                onChange={this.renameinputchange} 
                size='small' 
                style={{width:'50px'}} 
                placeholder={item.title} 
                value={renamevalue}></Input>
            :title}>
            
            {(item.key == addkey)?
            <TreeNode 
            disabled 
            title={
              <Input 
              size='small' 
              onPressEnter={this.addaction} 
              onChange={this.addinputchange}
              value={addvalue} 
              style={{width:'50px'}}></Input>
            }></TreeNode>:''}
            {loop(item.children)}
          </TreeNode>

        );
      }

    return (
       <TreeNode 
       onClick= {this.exitEdit}
       key={item.key} 
       title=
        {
          (item.key == changekey)?
          <Input 
          onPressEnter={this.renameaction}
          onChange={this.renameinputchange} 
          value={renamevalue} 
          size='small' 
          style={{width:'50px'}} 
          placeholder={item.title}></Input>:
          title
        }>
        {(item.key==addkey)?
        <TreeNode 
        disabled 
        key={tmptagkey} 
        title={
            <Input 
            onPressEnter={this.addaction} 
            onChange={this.addinputchange}
            value={addvalue} 
            size='small' 
            style={{width:'50px'}}></Input>}>
        </TreeNode>:''}
        </TreeNode>
    )
  });
    let menuitem = <div style={{
        "width": "118px",
	      "height": "88px",
	      "backgroundColor": "#ffffff",
	      "boxShadow": "0px 2px 10px 0px rgba(124, 124, 124, 0.29)",
         "borderRadius": "4px",
      }}>
       
        <div style={{
          width: "118px",
          height: "27px",
          "lineHeight": "27px",
          "paddingLeft": "21px",
          "fontFamily": "ArialMT",
          "fontSize": "14px",
          color: "#7c7c7c",
          "&:hover": {
          "backgroundColor": "rgba(124, 124, 124, 0.1)"
        }}}> 
        <MenuItem onClick={this.addhandle} >
        Add Tag After</MenuItem>
        </div>
        <div style={{
          width: "118px",
          height: "27px",
          "lineHeight": "27px",
          "paddingLeft": "21px",
          "fontFamily": "ArialMT",
          "fontSize": "14px",
          color: "#7c7c7c"}}> 
            <MenuItem onClick={this.showDeleteConfirm}>
          Delete</MenuItem>
       </div>
        <div style={{
          width: "118px",
          height: "27px",
          "lineHeight": "27px",
          "paddingLeft": "21px",
          "fontFamily": "ArialMT",
          "fontSize": "14px",
          color: "#7c7c7c",
          "&:hover": {
          "backgroundColor": "rgba(124, 124, 124, 0.1)"
        }}}> 
        <MenuItem onClick={this.changehandle}>
        Rename</MenuItem>
        </div>
    </div>
    let visible = {
      "display": "block"
    }
    let unvisible = {
      "display": "none"
    }
    return (
       <Layout style={{ minHeight: '100vh' }} >  
      
        <Sider
          
          // onDoubleClick={this.addRootTag}
          // onClick={this.exitEdit}
          collapsible
          collapsed={collapsed}
          collapsedWidth='0'
          trigger={null}
          width={siderwidth}
          style={{backgroundColor: '#fff'}}
        >
        <div className="siderwraper"  >

          <SearchWrapper>
            <Search 
            onChange={this.onchangeHandle}
            onClick={this.exitEdit}
            />
            <Icon 
              type="search" 
              style={{ fontSize: 14,
                       color: '#d2d2d2',
                       position: 'relative',
                       right: '170px'
                    }}
              />
          </SearchWrapper>  
          <Tags>
              <Text>Tags</Text>
              <div onClick={this.addRootTag}>
              	<Add >
                	<Icon type="plus"/>
              	</Add>
              </div>
            
          </Tags>
          <Tree
          checkable
          checkStrictly={true}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          onExpand={this.onExpandHandle}
          onCheck={this.onCheckHandle}
          selectedKeys={selectedKeys}>
           {loop(this.state.treeData)}
           {/* {console.log(this.state.treeData)} */}
           <TreeNode 
            style={(addroot)?visible:unvisible} 
            title={<Input 
                    // onPressEnter={()=>{this.setState({addroot: false},addTag(this.state.addvalue, null))}} 
                    onPressEnter={this.addrootaction} 
                    onChange={(e)=>{this.setState({addvalue: e.target.value})}} 
                    value={this.state.addvalue}
                    size="small"
                    style={{width: "50px"}}>
                    </Input>}>
            </TreeNode>
          </Tree>
          {/* <Button  size="small" onClick={this.showModal}>CONFIRM</Button>
          <Modal title="UPDATA"
          visible={this.state.confirmVisible}
          onOk={this.handleOk}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel}
          >
          <p>Are you sure to confirm those changes?</p>
          </Modal> */}
          <ContextMenu 
          id="some_unique_identifier" 
          >
            {menuitem}
          </ContextMenu>
        </div>


        <div className="slider" 
        style={{
          cursor: 'w-resize'
        }}
        onMouseDown={(e)=>{e.persist 
        this.setState({siderwidth: e.clientX+10})}} 
        onMouseUp={(e)=>{
          if(!this.state.collapsed){
            if (e.clientX <= 200) {
              this.setState({
                siderwidth: 200
              })
              this.props.setsider(200)
            } else if (e.clientX >= 500) {
              this.setState({
                siderwidth: 500
              })
              this.props.setsider(500)
            } else {
              this.setState({
                siderwidth: e.clientX
              }) 
              this.props.setsider(e.clientX)
            }
          }else{
            this.props.setsider(0)
          }
        }}>

        </div> 

        </Sider>


       <LayoutContent
       toggle={this.toggle}
       collapsed={this.state.collapsed}
       exitEdit={this.exitEdit}
       >
        {this.props.children}
       </LayoutContent>
      </Layout>
    )
  }
}
const mapStateToProps=(state)=>{
  // console.log(state)
  return{
    gData: state.home.treebar.gData,
    loading: state.home.treebar.loading
  }
}
const mapDispatchToProps= dispatch => {
  // console.log(actions)
  return {
      initTags: bindActionCreators(actions.home.treebar.initTags,dispatch),
      // renameTag: bindActionCreators(actions.home.treebar.renametag,dispatch),
      // deleteTag: bindActionCreators(actions.home.treebar.deletetag,dispatch),
      // addTag: bindActionCreators(actions.home.treebar.addtag,dispatch),
      selectTags: bindActionCreators(actions.home.treebar.selectTags,dispatch),
      confirmTags: bindActionCreators(actions.home.treebar.confirmTags, dispatch),
      setsider: bindActionCreators(actions.home.treebar.setsider, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TreeBar)
