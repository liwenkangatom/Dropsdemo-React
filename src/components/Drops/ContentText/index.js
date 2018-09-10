import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Input } from 'antd';

import * as actions from '../DropsRedux'
import {bindActionCreators } from 'redux'
import {connect } from 'react-redux'

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
            <span style={{position:'absolute'}}>
                <TextArea 
                    style={{
                        height:170,
                        width:397,
                        marginLeft:22,
                        resize:'none',
                    }} 
                    placeholder="Please Input"
                    defaultValue={this.props.content} 
                    onChange={this.onChange}
                 />
            </span>
        )
    }
}

function  mapStateToProps(state) {
    return {
        content: state.event.showcommit.content
    }
}
function mapDispatchToProps(Dispatch) {
    return {
        getChangeContent: bindActionCreators(actions.getChangeContent,Dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentText);