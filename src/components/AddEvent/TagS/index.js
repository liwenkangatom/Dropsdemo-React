import React,{ Component, Fragment } from 'react';
import Comtag from '../../Common/Comtag';
import * as actions from '../../Drops/DropsRedux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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
            gData={this.props.gData}
            handleClose={this.handleClose}
            showInput={this.showInput}
          />
        </Fragment>
      );
    }
  }

function  mapStateToProps(state) {
  return {
    gData: state.home.treebar.gData,
  }
}
function mapDispatchToProps(Dispatch) {
  return {
    getAddEventTags: bindActionCreators(actions.getAddEventTags,Dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TagS);