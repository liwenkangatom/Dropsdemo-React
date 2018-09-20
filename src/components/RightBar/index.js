import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import AddEvent from '../AddEvent';
import Drops from '../Drops';
import Submit from '../Submit';
import * as actions from '../Drops/DropsRedux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class RightBar extends Component {

    componentDidMount(){   
      this.props.initEventRedux()
    }
    render() {
      return (  
          <Layout> 

              <div style={{position:'relative', padding: 24, background: '#fff',minHeight: 735 }}>  
                <AddEvent/>
                <Submit/>
                <Drops/>
              </div>
        
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