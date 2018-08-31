import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Input } from 'antd';
const { TextArea } = Input;
class ContentText extends Component {

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
                 />
            </span>
        )
    }
}

export default ContentText;