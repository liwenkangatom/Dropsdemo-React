import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { DatePicker } from 'antd';

class Time extends Component {

     onChange = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
      }
      
      onOk = (value, dataString) => {
        console.log('onOk: ', value);
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

export default Time;