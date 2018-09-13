import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Input } from 'antd';
import * as actions from '../DropsRedux';
import {bindActionCreators } from 'redux';
import {connect } from 'react-redux';
import { ConetentTextWrapper } from './style'
const { TextArea } = Input;

class ContentText extends Component {
	
    onChange = (e) =>{
		const value = e.target.value;
		this.props.getChangeContent(value);
    }

    componentDidMount() {
        this.props.getChangeContent(this.props.content);
    }

    render(){
        return(
            <ConetentTextWrapper>
                <TextArea 
                    style={{
                        height:136,
                        width:436,
                        marginLeft:16,
                        marginTop:16,
                        resize:'none',
                        background:'#f8fafb'
                    }} 
                    className="scroll"
                    placeholder="Please Input"
                    defaultValue={this.props.content} 
                    onChange={this.onChange}
                 />
            </ConetentTextWrapper>
        )
    }
}

function  mapStateToProps(state) {
    return {
        content: state.home.event.showcommit.content
    }
}
function mapDispatchToProps(Dispatch) {
    return {
        getChangeContent: bindActionCreators(actions.getChangeContent,Dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentText);