import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Layout, Icon, Tree, Input,  Tooltip, Modal} from 'antd';
import 'antd/dist/antd.css';
import {actions} from '../../redux'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { Search, 
  SearchWrapper,
  Tags,
  Text,
  Add,
  Mtem,
  Menu
} from './style'
import './treebar.css'

import { ContextMenu, MenuItem , ContextMenuTrigger} from 'react-contextmenu'

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
class TreeBar extends Component {
  // static propTypes = {
  //   treeData: PropTypes.array,
  //   addTag: PropTypes.func,
  //   deleteTag: PropTypes.func,
  //   renameTag: PropTypes.func,
  //   selectedTag: PropTypes.func,
  //   initTags: PropTypes.func,
  // }
  // static defaultProps = {
  //   treeData: [],
  //   addTag: ()=>console.log('addtag'),
  //   deleteTag: ()=>console.log('deleteTag'),
  //   renameTag: () =>console.log('renameTag'),
  //   selectedTag: () =>console.log('selectedTag'),
  //   initTags: ()=> console.log('init')
  // }
  constructor(props) {
    super(props);
    this.state={
      data: this.props.treeData,
      dataList: [],

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
      addrootvalue:''
    }
  }
dataList = []
generateList=(data)=>{
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const key = node.key;
    this.dataList.push({ key: key, title: node.title });
    if (node.children) {
      this.generateList(node.children, node.Key);
    }
  }
};
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
  this.props.onselectTag(checkedKeys.checked)
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
    const expandedKeys = this.dataList.map((item) => {
      if (item.title.indexOf(value) > -1) {
        return getParentKey(item.key, this.state.data);
      }
      return null;
    }).filter((item, i, self) => item && self.indexOf(item) === i);
    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true,
    });
    
  }
// 收起面板
  toggle = () => {
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
    let tmp = this.state.expandedKeys
    let key = (this.state.rightclickkey)+''
    tmp.push(key)
    console.log(tmp)
    this.setState({
      addkey: this.state.rightclickkey,
      changekey: '',
      addroot: false,
      expandedKeys:tmp
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
  addaction=()=>{
    this.setState({addkey: ''},this.props.addTag(this.state.addvalue, this.state.rightclickkey))
    this.props.initTags()
    this.setState({data: this.props.gData},()=>{
      this.generateList(this.state.data)
    })
    this.setState({dataList: this.dataList})
  }
  addinputchange=(e)=>{
    this.setState({addvalue: e.target.value})
  }
  renameaction=()=>{
    this.setState({changekey:''},this.props.renameTag(this.state.rightclickkey, this.state.renamevalue))
    this.props.initTags()
    this.setState({data: this.props.gData},()=>{
      this.generateList(this.state.data)
    })
    this.setState({dataList: this.dataList})
  }
  renameinputchange=(e) => {
    this.setState({renamevalue: e.target.value})
    
  }
  deleteaction=()=>{
    this.props.deleteTag(this.state.rightclickkey)
    this.props.initTags()
    this.setState({data: this.props.gData},()=>{
      this.generateList(this.state.data)
    })
    this.setState({dataList: this.dataList})
  }
  componentWillMount() {
    console.log(this.props)
    this.props.initTags()
    console.log(this.props.gData)
    this.setState({data: this.props.gData},()=>{
      this.generateList(this.state.data)
    })
    this.setState({dataList: this.dataList})
    
  }
  
  render() {
    const {  treeData, addTag, renameTag, selectedTag} = this.props
    const { collapsed, siderwidth , data, addkey, changekey, tmptagkey} = this.state
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
          <TreeNode key={item.key} title=
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
        addTag</MenuItem>
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
          deleteTag</MenuItem>
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
        changeTag</MenuItem>
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
          onDoubleClick={this.addRootTag}
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
            <TreeNode 
            style={(addroot)?visible:unvisible} 
            title={<Input 
                    onPressEnter={()=>{this.setState({addroot: false},addTag(this.state.addvalue, null))}} 
                    onChange={(e)=>{this.setState({addvalue: e.target.value})}} 
                    value={this.state.addvalue}
                    size="small"
                    style={{width: "50px"}}>
                    </Input>}>
            </TreeNode>
            
           {loop(this.props.gData)}
          </Tree>
          <ContextMenu 
          id="some_unique_identifier" 
          onShow={(value)=>{console.log(value)}}>
            {menuitem}
          </ContextMenu>
        </div>


        <div className="slider" onDrag={(e)=>{
         e.persist
          this.setState({siderwidth: e.clientX})
        }} onDragEnd={
          (e)=>{
            e.persist
          console.log(e.clientX)
          if(e.clientX<= 200){
            this.setState({siderwidth: 200})
          }else if(e.clientX>= 500){
            this.setState({siderwidth: 500})
          }else this.setState({siderwidth: e.clientX})
          }
        }></div> 
          
        
        </Sider>
        <Layout onDragOver={()=>0}>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }} onClick={this.exitEdit}>
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    )
  }
}
const mapStateToProps=(state)=>{
  return{
    gData: state.home.treebar.gData
  }
}
const mapDispatchToProps= dispatch => {
  console.log(actions)
  return {
      initTags: bindActionCreators(actions.home.treebar.refreshtags,dispatch),
      renameTag: bindActionCreators(actions.home.treebar.renametag,dispatch),
      deleteTag: bindActionCreators(actions.home.treebar.deletetag,dispatch),
      addTag: bindActionCreators(actions.home.treebar.addtag,dispatch),
      onselectTag: bindActionCreators(actions.home.treebar.onSelect,dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TreeBar)
