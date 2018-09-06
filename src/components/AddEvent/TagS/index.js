import React,{ Component } from 'react';
import { Tag, Tooltip, Icon,TreeSelect } from 'antd';
import 'antd/dist/antd.css';
import {
  Add
} from './style'
import * as actions from '../../Drops/DropsRedux'
import {bindActionCreators } from 'redux'
import {connect } from 'react-redux'

const getParentKey = (key, tree) => {
  let parentkey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentkey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentkey = getParentKey(key, node.children);
      }
    }
  }
  return parentkey;
};


function deletetAllChildren(tree,key,deletetag) {
	tree.forEach(item => {
    if(item.key === key){
      deletetag.push(key);
    }
		if(item.children){
			item.children.forEach(item2 => {
				deletetAllChildren(item.children,item2.key,deletetag)
			})
    }
	})
}


class TagS extends Component {
    constructor(props){
        super(props);
        this.state = {
            tags: [],
            inputVisible: false,
            value:undefined,
        }
    }


    handleClose = (removedTagKey) => {
      let tags = this.state.tags;
      let deletetag = [];
      let addtagkeys = [];
      let aftertag = [];
      //找到该标签的子标签 并筛选出新的tags
      deletetAllChildren(this.props.gData,removedTagKey,deletetag);

      tags.forEach(tag => {
        if(deletetag.every(item => item !== tag[0])){
          aftertag.push(tag)
          addtagkeys.push(tag[0])
        }
      })


      this.setState({ tags:aftertag });
       //标签保存到store
        this.props.getAddEventTags(addtagkeys);
    }
    
    showInput = () => {
      this.setState({ inputVisible: true } );
    }
  
    onChange = (value,label,extra) => {
      //添加的标签的key值
      console.log("label", extra.triggerNode.props.eventKey)
      this.setState({ value: label[0] });
      const state = this.state;
      const addtag  = [extra.triggerNode.props.eventKey ,label[0]]
      let tags = state.tags;
      if (addtag && tags.every(item => item[0] !== addtag[0] )) {
        tags.push(addtag);
      }
      const gData = this.props.gData;

      let dataList = [];
      const generateList = (data) => {
        for (let i = 0; i < data.length; i++) {
          const node = data[i];
          const key = node.key;
          dataList.push({ key, title: node.title });
          if (node.children) {
            generateList(node.children, node.key);
          }
        }
      };

      generateList(gData);

      function getAllParent (key,tree) {
        const parentkey = getParentKey(key, gData);
        if(parentkey && tags.every(item => item[0] !== parentkey)) {
          dataList.forEach(item2 => {
            if(item2.key === parentkey) {
              tags.push([parentkey, item2.title])
            }
          })
          getAllParent(parentkey,gData)
        }
      }

      tags.forEach((item) =>{
        getAllParent(item[0],this.props.gData)
      })

        let tagkeys=[];
        tags.forEach((item) =>{   
          tagkeys.push(item[0])
        })

      //标签保存到store
      this.props.getAddEventTags(tagkeys);
      this.setState({
        tags,
        inputVisible: false,
        inputValue: '',
      });
      
    }


    render(){
      const { tags, inputVisible, value } = this.state;
      return (
        <div style={{display:'inline-block',marginLeft:22,minHeight:32}}>
          {tags.map((tag, index) => {
            const key = tag[0];
            const title = tag[1];
            const isLongTag = title.length > 20;
            let color;
            if ( index % 3 === 0 ) {
              color = 'rgb(116, 96, 238)'
            } else if ( index % 3 === 1 ) {
              color = 'rgb(10, 173, 246)'
            } else {
              color = 'rgb(40, 201, 109)'
            }
            const tagElem = (
              <Tag 
                key={key} 
                closable={true} 
                afterClose={() => this.handleClose(key)} 
                color={color}
              >
                {isLongTag ? `${title.slice(0, 20)}...` : title}
              </Tag>
            );
            return isLongTag ? <Tooltip title={title} key={key}>{tagElem}</Tooltip> : tagElem;
          })}
          {inputVisible && (
            <TreeSelect
              style={{ width: 78 }}
              value={value}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              treeData={this.props.gData}
              placeholder="Please select"
              treeDefaultExpandAll
  
              onChange={this.onChange}
            />

          )}
          {!inputVisible && (
            <Tag
              onClick={this.showInput}
              style={{ 
                background: '#fff',
                border:'0px',
              }}
            >
              <Add><Icon type="plus" />Tag</Add>
            </Tag>
          )}
        </div>
      );
      }
  }

function  mapStateToProps(state) {
  return {
    gData: state.tag.gData,
  }
}
function mapDispatchToProps(Dispatch) {
  return {
    getAddEventTags: bindActionCreators(actions.getAddEventTags,Dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TagS);