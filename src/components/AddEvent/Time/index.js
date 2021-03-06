import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { DatePicker } from 'antd';
import * as actions from '../../Drops/DropsRedux'
import {bindActionCreators } from 'redux'
import {connect } from 'react-redux'

class Time extends Component {

     onChange = (value, dateString) => {
        console.log('Selected Time: ', value._d);
        console.log('Formatted Selected Time: ', dateString);
        const time = value._d+"";
        this.props.getAddEventTime(time);
      }
      
      onOk = (value) => {
        if(value !== undefined){
          console.log('onOk:', value._d);
          const time = value._d+"";
          this.props.getAddEventTime(time);
        } else {
          console.log('select date frist')
        }
      }

    render(){
        
        return(
            <span>
                 <DatePicker
                    showTime
                   
                    format="YYYY-MM-DD HH:mm:ss"
                    placeholder="Select Time"
                    style={{width:397,marginLeft:22}}
                    onChange={this.onChange}
                    onOk={this.onOk}
                />
            </span>
        )
    }
}


function mapDispatchToProps(Dispatch) {
    return {
      getAddEventTime: bindActionCreators(actions.getAddEventTime,Dispatch)
    }
  }
  
  export default connect(null, mapDispatchToProps)(Time);