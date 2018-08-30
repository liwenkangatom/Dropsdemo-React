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
} from '../style'

class ModalWrapper extends Component {

    render() {
        return(
            <Fragment>
                <Modal
					visible={this.props.visible}
					width='529px'
					style={{height:'558px'}}
                        title={<Title>Add Event</Title>}
                        onOk={this.props.handleOk}
                        onCancel={this.props.handleCancel}
                        destroyOnClose={true}
                        footer={[
                            <Button 
                            key="submit" 
                            type="primary" 
                            loading={this.props.loading}
                            onClick={this.props.handleOk}
                            style={{
                                width: 114,
                                height: 36,
                                backgroundColor: '#ff903d',
                                border:'#ff903d',
                                boxShadow: '0px 4px 10px 0px rgba(255, 144, 61, 0.48)',
                                borderRadius: 6,
                            }}
                            >
                            Add Event
                            </Button>,
                            <Button 
                            key="back" 
                            onClick={this.props.handleCancel}
                            style={{
                                width: 90,
                                height: 36,
                                borderRadius: 6,
                                border: 'solid 1px #d2d2d2',
                                fontSize: 14,
                                color: '#7c7c7c'
                            }}
                            >
                            Return
                            </Button>,
                        ]}
                        >
                        <ContentWrapper>
                            <Content>
                            <ContentTitle>Tag</ContentTitle>
                                <TagS />
                            </Content>

                            <Content>
                            <ContentTitle>Time</ContentTitle>
                            <Time/>
                            </Content>

                            <Content>
                            <ContentTitle>Subject</ContentTitle>
                            <Subject/>
                            </Content>

                            <Content>
                            <ContentTitle>Content</ContentTitle>
                            <ContentText/>
                            </Content>
                        </ContentWrapper>

                    </Modal>
            </Fragment>
        )
    }
}

export default ModalWrapper;