import React,{ Component, Fragment } from 'react';
import Comtag from '../../Common/Comtag';
import * as actions from '../../Drops/DropsRedux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const deepCopy = (obj) => {
  if(typeof obj !== 'object'){
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
      const tags = this.state.tags.filter(tag => tag[0] !== removedTagKey);
      this.setState({ tags:tags });
       //标签保存到store
      const addtagkeys = [];
      tags.forEach(tag => addtagkeys.push(tag[0]))
      this.props.getAddEventTags(addtagkeys);
    }
    
    showInput = () => {
      this.setState({ inputVisible: true } );
    }
  
    onChange = (value,label,extra) => {
      //添加的标签的key值
      this.setState({ value: label[0] });
      const state = this.state;
      const addtagkey = extra.triggerNode.props.eventKey;
      const addtag  = [addtagkey ,label[0]];
      let tagkeys=[];
      let tags = state.tags;
      if (addtag && tags.every(item => item[0] !== addtagkey )) {
        tags.push(addtag);
      }
      tags.forEach(tag => {
        tagkeys.push(tag[0])
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
        <Fragment>
          <Comtag
            tags={tags}
            inputVisible={inputVisible}
            value={value}
            onChange={this.onChange}
            gData={transData(this.props.gData)}
            handleClose={this.handleClose}
            showInput={this.showInput}
          />
        </Fragment>
      );
    }
  }

function  mapStateToProps(state) {
  return {
    gData: state.home.treebar.gData.tree,
  }
}
function mapDispatchToProps(Dispatch) {
  return {
    getAddEventTags: bindActionCreators(actions.getAddEventTags,Dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TagS);
