import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { DatePicker } from 'antd';
import { transDate } from '../utils';
import * as actions from '../DropsRedux';
import {bindActionCreators } from 'redux';
import {connect } from 'react-redux';
import moment from 'moment';
class Time extends Component {

     onChange = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
        const time = value._d+"";
        this.props.getChangeTime(time);
      }
      
      onOk = (value, dataString) => {
        console.log('onOk: ', value);
        const time = value._d+"";
        this.props.getChangeTime(time);
      }

      componentDidMount() {
        this.props.getChangeTime(this.props.date);
      }
      
    render(){
        const date = transDate(new Date(this.props.date))
        return(
            <span>
                 <DatePicker
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    defaultValue={moment(date, 'YYYY-MM-DD HH:mm:ss')}
                    style={{width:397,marginLeft:22}}
                    onChange={this.onChange}
                    onOk={this.onOk}
                />
            </span>
        )
    }
}

function  mapStateToProps(state) {
    console.log()
    return {
        date: state.event.showcommit.date
    }
}
function mapDispatchToProps(Dispatch) {
    return {
        getChangeTime: bindActionCreators(actions.getChangeTime, Dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Time);