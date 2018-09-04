import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Layout, Icon, Tree, Tooltip, Input} from 'antd';
import ReactDOM from 'react-dom';

import * as Actions from './LeftSliderBarRedux'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'


import RightBar from '../RightBar'
import { Search, 
         SearchWrapper,
         Tags,
         Text,
         Add,
         Menu,
         MenuItem
} from './style';
const TreeNode = Tree.TreeNode;
const { Sider } = Layout;
const gData = [{
  title: 'Event track1',
  key: '0',
  num: 20,
  children:[{
    title: 'Actual schedules',
    key: '0-1',
    num: 12,
  },{
    title: 'Admin on rest',
    key: '0-2',
    num: 8
  }] 
},{
  title: 'Event track2',
  num: 72,
  key: '1',
  children:[{
    title: 'Admin On Rest1',
    key: '18',
    num: 50
  },{
    title: 'Adimin On Rest2',
    key: '1-2',
    num: 12,
    children:[{
      title: 'Proforma',
      key: '11',
      num: 12
    }]
  },{
    title: 'Admin On Rest3',
    key: '1-3',
    num: 30
  }]
}]

//节点放进数组
let dataList = [];
const generateList = (data) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const key = node.key;
    dataList.push({ key, title: node.title });
    if (node.children) {
      generateList(node.children, node.Key);
    }
  }
};
generateList(gData);

//寻找父节点
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


class LeftSlideBar extends Component {

  constructor(props){
    super(props);
    this.state = {
      collapsed: true,
      searchValue:'',
      expandedKeys: [],
      selectedKey: [],
      menux: 0,
      menuy: 0,
      autoExpandParent: true,
      inputvisible: false
    }
  }
  onExpand = (expandedKeys) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }

  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
    this.setState({
      selectedKeys
    })
  }

  onCheck = (checkedKeys, info) => {
    console.log(info);
  }

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
	}

  onRightClick = (info) => {
    console.log('right click', info);
    let menux = info.event.pageX-999
    let menuy = info.event.pageY
    let selectedKey = info.node.props.eventKey
    this.setState({ selectedKey: selectedKey,
    menux,
  menuy}, ()=>{
    this.renderCm()
  })


    console.log(this.state )
  }

  onchange = (e) => {
    const value = e.target.value;
    const expandedKeys = dataList.map((item) => {
      if (item.title.indexOf(value) > -1) {
        return getParentKey(item.key, gData);
      }
      return null;
    }).filter((item, i, self) => item && self.indexOf(item) === i);
    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true,
    });
    
  }

  handleAddTag = (info) => {
    console.log(info)
    // this.renderinput(info)
    // this.props.addTag('testTag', this.state.selectedKey)
    // this.props.initTag()
    console.log("info");
  }

  handleRename = (info) => {
    this.setState({inputvisible: true}, ()=>{
      this.renderCm(info)
    })
    console.log(info);
  }

handleDelete= (info) =>{
  this.props.deleteTag(this.state.selectedKey)
  this.props.initTag()
    console.log(info);
  }


componentWillMount() {
  console.log(dataList)
  this.props.initTag()
}

  componentDidMount(){
    this.getContainer();
  }
  componentWillUnmount() {
    if (this.cmContainer) {
      ReactDOM.unmountComponentAtNode(this.cmContainer);
      document.body.removeChild(this.cmContainer);
      this.cmContainer = null;
    }
  }

  getContainer() {
    if (!this.cmContainer) {
      this.cmContainer = document.createElement('div');
      document.body.appendChild(this.cmContainer);
    }
    return this.cmContainer;
  }
// renderinput() {
//   if(this.input) {
//     ReactDOM.unmountComponentAtNode(this.cmContainer)
//     this.input = null
//   }
//   this.input = (
//     <Input
//     size='small'

//     ></Input>
//   )

//     const container = this.getContainer();
//     const theleft = this.state.menux;
//     Object.assign(this.cmContainer.style, {
//       position: 'absolute',
//       left: `${theleft}px`,
//       top: `${this.state.menuy}px`,
//     });

//     ReactDOM.render(this.input, container);

// }
  //生成右击菜单
  renderCm(info) {

    if (this.menu) {
      ReactDOM.unmountComponentAtNode(this.cmContainer);
      this.menu = null;
    }
    const visible=this.state.inputvisible?{'display':'block'}:{'display':'none'}
    this.menu = (
      <Tooltip
        trigger="click" 
        placement="bottomRight" 
        defaultVisible

        title={
            <Menu>
            <Input style={visible}></Input>
            <MenuItem onClick={this.handleDelete}>Delete</MenuItem>
            <MenuItem onClick={this.handleRename}>Rename</MenuItem>
            <MenuItem onClick={this.handleAddTag}>Add a tag</MenuItem>
          </Menu>
        }
      >
      
    </Tooltip>
    );

    const container = this.getContainer();
    // const theleft = info.event.pageX -999;
    Object.assign(this.cmContainer.style, {
      position: 'absolute',
      left: `${this.state.menux}px`,
      top: `${this.state.menuy}px`,
    });

    ReactDOM.render(this.menu, container);
  }

  render() {
    
    const { searchValue, expandedKeys, autoExpandParent } = this.state;
    const loop = data => data.map((item) => {
      const index = item.title.indexOf(searchValue);
      const beforeStr = item.title.substr(0, index);
      const afterStr = item.title.substr(index + searchValue.length);
      const title = index > -1 ? (
        <span>
          {beforeStr}
          <span style={{ color: '#f50' }}>{searchValue}</span>
          {afterStr}
        </span>
      ) : <span>{item.title}</span>;
      if (item.children) {
        return (
          <TreeNode key={item.key} title={title}>
            {loop(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} title={title} />;
    });

    return (
      <Layout style={{ minHeight: '100vh' }}>   
        <Sider
          collapsible
          collapsed={this.state.collapsed}
					onCollapse={this.onCollapse}
					collapsedWidth='224'
					theme='light'
					width='450'
        > 
          <SearchWrapper>
            <Search onChange={this.onchange}/>
            <Icon 
              type="search" 
              style={{ fontSize: 14,
                       color: '#d2d2d2',
                       position:'absolute',
                       left: 9,
                       top: 10
                    }}
              />
          </SearchWrapper>  
          <Tags>
              <Text>Tags</Text>
              <Add>
                <Icon type="plus" />
              </Add>
          </Tags>
           <Tree
            checkable
            onRightClick={this.onRightClick}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
            onExpand={this.onExpand}
            onSelect={this.onSelect}
            onCheck={this.onCheck} 
            selectedKeys={this.state.selectedKeys}   
          >
            {loop(this.props.dropsValue)}
            
          </Tree>     
          
        </Sider>


        <RightBar/>

      </Layout>
    );
  }
}

function mapStateToProps(state) {
    console.log(state)
    return {
        dropsValue: state.tag.gData,
        dataList: state.tag.dataList,
        error: state.tag.error,
        loading: state.tag.loading
        
    }
}
function mapDispatchToProps(dispatch) {
    return {
        initTag: bindActionCreators(Actions.refreshtags, dispatch),
        addTag: bindActionCreators(Actions.addtag, dispatch),
        renameTag: bindActionCreators(Actions.renametag, dispatch),
        deleteTag: bindActionCreators(Actions.deletetag, dispatch),
        onSelect: bindActionCreators(Actions.onSelect, dispatch),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LeftSlideBar)