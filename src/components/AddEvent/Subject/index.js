import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Input } from 'antd';

import * as actions from '../../Drops/DropsRedux'
import {bindActionCreators } from 'redux'
import {connect } from 'react-redux'


class Subject extends Component {


    onChange = (e) =>{
        const value = e.target.value;
        const key = value + this.props.date
		this.props.getAddEventSubject(value, key);
    }

    render(){
        return(
            <span>
                <Input
                    style={{width:397,marginLeft:22}} 
                    placeholder="Please Input" 
                    onChange = {this.onChange}
                />
            </span>
        )
    }
}

function  mapStateToProps(state) {
    return {
      date: state.event.addcommit.date,
    }
  }

  function mapDispatchToProps(Dispatch) {
    return {
      getAddEventSubject: bindActionCreators(actions.getAddEventSubject,Dispatch)
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Subject);