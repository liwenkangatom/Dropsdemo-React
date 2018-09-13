import React, { Component } from 'react';
import 'antd/dist/antd.css';
import TagS from './TagS';
import Time from './Time';
import Subject from './Subject';
import ContentText from './ContentText';
import { Button, Modal, Icon, Pagination } from 'antd';
import { 
  Title, 
  ContentWrapper,
  Content,
  ContentTitle,
  EventWrapper,
  AddWrapper,
  Close,
  ButtonWrapper,
  ButtonWrapperBack,
} from './style'

import * as actions from '../Drops/DropsRedux';
import {bindActionCreators } from 'redux';
import {connect } from 'react-redux';



class AddEvent extends Component {

	constructor(props){
		super(props);
		this.state = {
      count:0,
      total: [0],
      selectpage:1,
			loading: false,
      visible: false,
      confirm: false,
		}
	}

	showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = () => {
    if (this.props.addtags.length){
      this.setState({ loading: true });
      const total = this.state.total;
      const addcommits = [];
      total.forEach(item => {
        addcommits.push(this.props.addcommits[item])
      })      
      this.props.addtags.forEach( key =>{
        this.props.addEventAction(key, addcommits)
      })
      
      this.props.reAddCommits()
      setTimeout(() => {
        this.setState({ loading: false, confirm: true, visible: false});
      }, 3000);
    } else {
      console.log("NO Tags")
    }
  }

  handleCancel = () => {
    this.setState({ 
      visible: false,
      confirm: false, 
      count: 0,
      total: [0],
      selectpage:1,
    });
    this.props.reAddCommits()
  }

  addTotal = () => {
    const total = this.state.total;
    let count = this.state.count;
    count = count + 1;
    total.push(count);
    const selectpage = total.length;
    this.props.getEventIndex(total[selectpage-1]);
    this.setState({
      total,
      count,
      selectpage
    })
    this.props.addAddCommits();
  }

  paginationChange = (pagNumber) => {
    const total = this.state.total;
    this.setState({
      selectpage: pagNumber,
    })
    this.props.getEventIndex(total[pagNumber-1]);
  }

  deleteItem = (item,index) => {
    let selectpage = this.state.selectpage;
    const total = this.state.total;
    if(index === total.length-1){
      selectpage = selectpage - 1;
      this.props.getEventIndex(total[selectpage-1]);
    } else {
      this.props.getEventIndex(total[selectpage]);
    }
    total.forEach((item2,index) => {
      if(item === item2){
        total.splice(index,1);
      }
    })

    this.setState({
      total,
      selectpage,
    })
  }

  render() {
		const { visible, loading, total, selectpage, confirm } = this.state;
    return ( 
			<div>
				<Button 
					type="primary" 
					onClick={this.showModal}
					style={{
            background: "rgb(255,144,62)",
            border:"rgb(255,144,62)",
            float:"right"
          }}
				>
					<Icon type="plus" /> AddEvent
				</Button>

        <Modal
					visible={visible}
					width='529px'
          bodyStyle={{background: '#f8fafb',paddingTop:0,paddingBottom:0}}
          title={<Title>Add Event</Title>}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          destroyOnClose={true}
          footer={[
            <ButtonWrapper key='submitt'>
            <Button 
              key="submit" 
              type="primary" 
              loading={loading}
              onClick={this.handleOk}
              style={confirm ? {
                width: 114,
                height: 36,
                backgroundColor: '#f76d30',
                border:'0px',
                boxShadow: '0px 4px 10px 0px rgba(255, 144, 61, 0.48)',
                borderRadius: 6,
              } : {
                width: 114,
                height: 36,
                backgroundColor: '#ff903d',
                border:'0px',
                boxShadow: '0px 4px 10px 0px rgba(255, 144, 61, 0.48)',
                borderRadius: 6,
              }}
            >
              Confirm
            </Button>
            </ButtonWrapper>,
            <ButtonWrapperBack key="backk"> 
            <Button 
              key="back" 
              onClick={this.handleCancel}
              style={{
                width: 90,
                height: 36,
                borderRadius: 6,
                border: 'solid 1px #d2d2d2',
                fontSize: 14,
                color: '#7c7c7c'
              }}
            >
              Cancel
            </Button>
            </ButtonWrapperBack>
            ,

          ]}
        >
          <ContentWrapper>
            <Content>
              <ContentTitle>Tag</ContentTitle>
                <TagS />
            </Content>

            <Content>
              <ContentTitle>
                Event
                <Pagination
 
                  defaultPageSize={1}
                  total={total.length}
                  current={selectpage}
                  size="small"
                  onChange={this.paginationChange}
                  style={{
                    position:"absolute",
                    right:55,
                    top:5
                  }} 
                />
                <AddWrapper onClick={this.addTotal}>
                  <Icon 
                    type="plus"
                    style={{
                      fontSize:16,
                      color:'#f58220'
                    }} 
                  />
               </AddWrapper>
              </ContentTitle>
            </Content>

            {
              total.map((item,index) => {
                if(index + 1  !== selectpage) {
                  return(
                    <EventWrapper key={item} style={{display:'none'}}>
                      <Close  onClick={this.deleteItem.bind(this,item,index)}/>
                      <Subject/>
                      <Time/>
                      <ContentText/>
                    </EventWrapper>   
                  )
                }else{
                  return(
                    <EventWrapper key={item}>
                      <Close
                        onClick={this.deleteItem.bind(this,item,index)}
                        style={total.length === 1 ? {display:'none'} : {display:'block'}}
                      />
                      <Subject/>
                      <Time/>
                      <ContentText/>
                    </EventWrapper>  
                  )
                }
              })
            }
          </ContentWrapper>

        </Modal>
      </div>
    );
  }
}

function  mapStateToProps(state) {

  return {
    addtags: state.home.event.addtags,
    addcommits: state.home.event.addcommits
  }
}
function mapDispatchToProps(Dispatch) {
  return {
    addEventAction: bindActionCreators(actions.addEventAction,Dispatch),
    reAddCommits: bindActionCreators(actions.reAddCommits,Dispatch),
    getEventIndex: bindActionCreators(actions.getEventIndex,Dispatch),
    addAddCommits: bindActionCreators(actions.addAddCommits,Dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEvent);