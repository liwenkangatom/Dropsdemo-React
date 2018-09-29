import React, { Component,Fragment } from 'react';
import 'antd/dist/antd.css';
import TagS from '../TagS';
import Time from '../Time';
import Subject from '../Subject';
import ContentText from '../ContentText';
import { Button, Modal } from 'antd';
import { 
  Title, 
  ContentWrapper,
  Content,
  ContentTitle,
  EventWrapper,
  ButtonWrapper,
  ButtonWrapperBack,
  ButtonWrapperDelete,
  Tips
} from '../style';

import {connect } from 'react-redux'

class ModalWrapper extends Component {

    render() {
        const { visible, handleCancel, handleOk, loading, handleDelete, show, showevent } = this.props;
        // console.log(name) 
        return(
            <Fragment>
                <Modal
					visible={visible}
					width='529px'
                    style={{height:'558px'}}
                    bodyStyle={{background: '#f8fafb',paddingTop:0,paddingBottom:0}}
                    title={<Title>{this.props.subject}</Title>}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    destroyOnClose={true}
                    footer={[
                        <ButtonWrapperDelete key="del">
                        <Button
                            key="delete"
                            type='danger'
                            onClick={handleDelete}
                            style={{
                                width: 89,
                                height: 36,
                                borderRadius: 6,
                                border: 'solid 1px #ff3d3d',
                                fontSize: 14,
                            }}
                        >
                            Delete
                        </Button>
                        </ButtonWrapperDelete>
                        ,
                        <ButtonWrapper key="submitt">
                        <Button 
                            key="submit" 
                            type="primary" 
                            loading={loading}
                            onClick={handleOk}
                            style={{
                                width: 114,
                                height: 36,
                                backgroundColor: '#ff903d',
                                border:'#ff903d',
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
                            onClick={handleCancel}
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
                        </ButtonWrapperBack>,
                        
                    ]}
                >
                    <ContentWrapper>
                        <Content>
                            <ContentTitle>Tag</ContentTitle>
                            <Tips className={show === true ? 'show' : 'hidden'}>please select tags</Tips>
                            <TagS />
                        </Content>

                        <Content>
                            <ContentTitle>Event</ContentTitle>
                            <Tips className={showevent === true ? 'show' : 'hidden'}>Please complete the form</Tips>
                        </Content>

                        <EventWrapper>
                            <Subject/>
                            <Time/>
                            <ContentText/>
                        </EventWrapper>
                    </ContentWrapper>
                </Modal>
            </Fragment>
        )
    }
}

function  mapStateToProps(state) {
    return {
        subject: state.home.event.showcommit.subject,
    }
}

export default connect(mapStateToProps, null)(ModalWrapper);