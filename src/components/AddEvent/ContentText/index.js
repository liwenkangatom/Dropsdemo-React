import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Input } from 'antd';

import * as actions from '../../Drops/DropsRedux'
import {bindActionCreators } from 'redux'
import {connect } from 'react-redux'

const { TextArea } = Input;
class ContentText extends Component {

    onChange = (e) =>{
		const value = e.target.value;
		this.props.getAddEventContent(value);
    }

    render(){
        return(
            <span style={{position:'absolute'}}>
                <TextArea 
                    style={{
                        height:170,
                        width:397,
                        marginLeft:22,
                        resize:'none',
                    }} 
                    placeholder="Please Input" 
                    onChange={this.onChange}
                 />
            </span>
        )
    }
}


  function mapDispatchToProps(Dispatch) {
    return {
      getAddEventContent: bindActionCreators(actions.getAddEventContent,Dispatch)
    }
  }
  
export default connect(null, mapDispatchToProps)(ContentText);

