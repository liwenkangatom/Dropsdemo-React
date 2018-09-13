import React,{ Component, Fragment } from 'react';
import * as actions from '../DropsRedux';
import {bindActionCreators } from 'redux';
import {connect } from 'react-redux';
import Comtag from '../../Common/Comtag';
import { generateList } from '../../Common/utils';

class TagS extends Component {
    constructor(props){
        super(props);
        this.state = {
            tags:[],
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
      this.props.getShowTags(addtagkeys);
    }

    showInput = () => {
      this.setState({ inputVisible: true }, );
    }
  
    onChange = (value,label,extra) => {
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
      this.props.getShowTags(tagkeys);
      this.setState({
        tags,
        inputVisible: false,
        inputValue: '',
      });
    }
    
    componentDidMount() {
      let dataList = [];
      generateList(this.props.gData, dataList);
      let tagkeys=[];
      let tags=[];
      this.props.eventtag.forEach((item) => {
        if(item.eventkey === this.props.eventkey){
          tagkeys.push(item.tagkey);
        }
      })
      tagkeys.forEach(item => {
        dataList.forEach(item2 => {
          if(item === item2.key) {
            tags.push([item2.key,item2.title])
          }
        })
      })
      this.props.getShowTags(tagkeys)
      this.setState({tags})      
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
      eventkey: state.home.event.showcommit.key,
      eventtag: state.home.event.eventtag,
      tags: state.home.event.showtags
  }
}
function mapDispatchToProps(Dispatch) {
  return {
      addevent: bindActionCreators(actions.addEventAction, Dispatch),
      getShowTags: bindActionCreators(actions.getShowTags, Dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TagS)