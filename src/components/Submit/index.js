import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import { ButtonWrapper } from './style.js';
import * as actions from '../Drops/DropsRedux';
import {bindActionCreators } from 'redux';
import {connect } from 'react-redux';

const confirm = Modal.confirm;

class Submit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  }

  showConfirm = () => {
    confirm({
      title: 'Do you want to submit these items?',
      content: '',
      onOk() {
          // this.props.uploadTagEvent(this.props.data, this.props.eventtag, this.props.gData)
          console.log("data:")
      },
      onCancel() {},
    })
  }
  handleSubmit = () => {
    this.setState({loading: true});
    this.props.uploadTagEvent(this.props.data, this.props.eventtag, this.props.gData);
    setTimeout(() => {
      this.setState({loading: false})
    }, 3000)
  }

  render() {
    return (
      <ButtonWrapper>
        <Button loading={this.state.loading} onClick={this.handleSubmit}>
          Submit
        </Button>
      </ButtonWrapper>
    )   
  }
}

function  mapStateToProps(state) {

  return {
    data: state.home.event.data,
    eventtag: state.home.event.eventtag,
    gData: state.home.treebar.gData.tree
  }
}
function mapDispatchToProps(Dispatch) {
  return {
    uploadTagEvent: bindActionCreators(actions.uploadTagEvent,Dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Submit);