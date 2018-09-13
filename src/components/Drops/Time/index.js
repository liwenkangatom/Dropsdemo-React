import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { DatePicker } from 'antd';
import { transDate } from '../../Common/utils';
import * as actions from '../DropsRedux';
import {bindActionCreators } from 'redux';
import {connect } from 'react-redux';
import moment from 'moment';
class Time extends Component {

     onChange = (value, dateString) => {
        const time = value._d+"";
        this.props.getChangeTime(time);
      }
      
      onOk = (value, dataString) => {
        const time = value._d+"";
        this.props.getChangeTime(time);
      }

      componentDidMount() {
        this.props.getChangeTime(this.props.date);
        const data = document.getElementsByClassName('ant-calendar-picker-input ant-input')[0];
        data.style.background='#f8fafb'
      }
      
    render(){
        const date = transDate(new Date(this.props.date))
        return(
            <span>
                 <DatePicker
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    defaultValue={moment(date, 'YYYY-MM-DD HH:mm:ss')}
                    style={{
                        width:210,
                        height:32,
                        marginLeft:16,
                        borderRadius: 4,
                    }}
                    onChange={this.onChange}
                    onOk={this.onOk}
                />
            </span>
        )
    }
}

function  mapStateToProps(state) {
    return {
        date: state.home.event.showcommit.date
    }
}
function mapDispatchToProps(Dispatch) {
    return {
        getChangeTime: bindActionCreators(actions.getChangeTime, Dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Time);