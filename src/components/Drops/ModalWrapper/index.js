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
  ContentTitle
} from '../style';

import {connect } from 'react-redux'

class ModalWrapper extends Component {

    render() {
        const { visible, handleCancel, handleOk, loading, handleDelete } = this.props;
        // console.log(name) 
        return(
            <Fragment>
                <Modal
					visible={visible}
					width='529px'
					style={{height:'558px'}}
                        title={<Title>{this.props.subject}</Title>}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        destroyOnClose={true}
                        footer={[
                            <Button
                                key="delete"
                                type='danger'
                                onClick={handleDelete}
                                style={{
                                    position:'absolute',
                                    left:29,
                                    width: 89,
                                    height: 36,
                                    borderRadius: 6,
                                    border: 'solid 1px #ff3d3d',
                                    fontSize: 14,
                                }}
                            >
                                Delete
                            </Button>,
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
                            </Button>,
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
                            </Button>,
                            
                        ]}
                        >
                        <ContentWrapper>
                            <Content>
                            <ContentTitle>Tag</ContentTitle>
                                <TagS  />
                            </Content>

                            <Content>
                            <ContentTitle>Time</ContentTitle>
                            <Time />
                            </Content>

                            <Content>
                            <ContentTitle>Subject</ContentTitle>
                            <Subject />
                            </Content>

                            <Content>
                            <ContentTitle>Content</ContentTitle>
                            <ContentText />
                            </Content>
                        </ContentWrapper>

                    </Modal>
            </Fragment>
        )
    }
}

function  mapStateToProps(state) {
    return {
        subject: state.event.showcommit.subject,

    }
}

export default connect(mapStateToProps, null)(ModalWrapper);