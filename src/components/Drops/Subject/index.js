import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Input } from 'antd';
import * as actions from '../DropsRedux'
import {bindActionCreators } from 'redux'
import {connect } from 'react-redux'

class Subject extends Component {
    onChange = (e) =>{
        const value = e.target.value;
		this.props.getChangeSubject(value);
    }

    componentDidMount() {
        this.props.getChangeSubject(this.props.subject);
        this.props.getChangeKey(this.props.eventkey)
    }

    render(){
        return(
            <span>
                <Input
                    style={{
                        width:210,
                        height:32,
                        marginLeft:16,
                        background: '#f8fafb',
                        borderRadius: 4,
                    }} 
                    placeholder="Please Input" 
                    defaultValue={this.props.subject}
                    onChange = {this.onChange}
                />
            </span>
        )
    }
}

function  mapStateToProps(state) {
    return {
        subject: state.home.event.showcommit.subject,
        eventkey: state.home.event.showcommit.key
    }
}
function mapDispatchToProps(Dispatch) {
    return {
        getChangeSubject: bindActionCreators(actions.getChangeSubject,Dispatch),
        getChangeKey: bindActionCreators(actions.getChangeKey,Dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Subject);