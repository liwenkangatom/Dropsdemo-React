import React, { Component } from 'react';
import 'antd/dist/antd.css';
import TagS from './TagS';
import Time from './Time';
import Subject from './Subject';
import ContentText from './ContentText';
import { Button, Modal, Icon } from 'antd';
import { 
  Title, 
  ContentWrapper,
  Content,
  ContentTitle
} from './style'

class AddEvent extends Component {

	constructor(props){
		super(props);
		this.state = {
			loading: false,
			visible: false
		}
	}

	showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  render() {
		const { visible, loading } = this.state;
    return ( 
      
			<div>
				<Button 
					type="primary" 
					onClick={this.showModal}
					style={{background: "rgb(255,144,62)",border:"rgb(255,144,62)"}}
				>
					<Icon type="plus" /> AddEvent
				</Button>
        <Modal
					visible={visible}
					width='529px'
					style={{height:'558px'}}
          title={<Title>Add Event</Title>}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          destroyOnClose={true}
          footer={[
            <Button 
              key="submit" 
              type="primary" 
              loading={loading}
              onClick={this.handleOk}
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
      </div>
    );
  }
}

export default AddEvent;