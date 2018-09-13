import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Input } from 'antd';
import * as actions from '../../Drops/DropsRedux';
import {bindActionCreators } from 'redux';
import {connect } from 'react-redux';


class Subject extends Component {


    onChange = (e) =>{
        const value = e.target.value;
        const key = new Date().getTime(); 
		this.props.getAddEventSubject(value, key);
    }

    render(){
        return(
            <span>
                <Input
                    style={{
                        width:210,
                        height:32,
                        marginLeft:16,
                        background: '#f8fafb',
                        borderRadius: 4,
                    }} 
                    placeholder="Subject" 
                    onChange = {this.onChange}
                />
            </span>
        )
    }
}


  function mapDispatchToProps(Dispatch) {
    return {
      getAddEventSubject: bindActionCreators(actions.getAddEventSubject,Dispatch)
    }
  }
  
  export default connect(null, mapDispatchToProps)(Subject);