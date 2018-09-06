import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import AddEvent from '../AddEvent';
import Drops from '../Drops';
import axios from 'axios';

import * as actions from '../Drops/DropsRedux'
import {bindActionCreators } from 'redux'
import {connect } from 'react-redux'

const { Content } = Layout;

class RightBar extends Component {

  // 从json获取初始数据
    componentDidMount(){
      axios.get('/api/data')
      .then((res) => {
        console.log(res.data[0])
        this.props.initEventRedux(res.data[0].gData,res.data[0].data,res.data[0].eventtag)
      })
      .catch(() => {
        console.log("ajax failed,get data by require()")
        const thedata = require('../../data.json');
        this.props.initEventRedux(thedata[0].gData,thedata[0].data,thedata[0].eventtag)
      })
    }
    render() {
      return (
  
          <Layout>
            <Content style={{ margin: '38px 0px 0px 38px' }}>
              <div style={{ padding: 24, background: '#fff',minHeight: 735 }}>  
                <AddEvent></AddEvent>
                <Drops/>
              </div>
            </Content>
          </Layout>
  
      );
    }
  }
  function mapDispatchToProps(Dispatch) {
    return {
        initEventRedux: bindActionCreators(actions.getInitEventRedux,Dispatch)
    }
  }
  
  export default connect(null, mapDispatchToProps)(RightBar)