import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Input } from 'antd';

class Subject extends Component {

    render(){
        return(
            <span>
                <Input
                    style={{width:397,marginLeft:22}} 
                    placeholder="Please Input" 
                    defaultValue={this.props.subject}
                />
            </span>
        )
    }
}

export default Subject;