import React, { Component } from 'react'
import { Layout, Icon } from 'antd'

const { Content, Header} = Layout

export default class LayoutContent extends Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
     if (this.props.collapsed !== nextProps.collapsed) {
       return true;
     }
     return false;
  }
  render() {
    return (
      <div style={{
        width:"100%"
      }}>
      
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.props.toggle}
            />
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }} onClick={this.props.exitEdit}>
            {this.props.children}
          </Content>
       
      </div>
    )
  }
}
