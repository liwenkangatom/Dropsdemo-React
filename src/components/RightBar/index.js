import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import AddEvent from '../AddEvent'
import Drops from '../Drops'
const { Content} = Layout;

class RightBar extends Component {

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
  export default RightBar;