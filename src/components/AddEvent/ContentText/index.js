import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Input } from 'antd';
import * as actions from '../../Drops/DropsRedux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ConetentTextWrapper } from './style'
const { TextArea } = Input;
class ContentText extends Component {

    onChange = (e) =>{
		const value = e.target.value;
		this.props.getAddEventContent(value);
    }

    render(){
        return(
            <ConetentTextWrapper >
                <TextArea
                    style={{
                        position:'absolute',
                        height:136,
                        width:436,
                        marginLeft:16,
                        marginTop:16,
                        resize:'none',
                        background:'#f8fafb',
                    }}
                    placeholder="Contant"
                    className="scroll"
                    onChange={this.onChange}
                 />
            </ConetentTextWrapper>
        )
    }
}


  function mapDispatchToProps(Dispatch) {
    return {
      getAddEventContent: bindActionCreators(actions.getAddEventContent,Dispatch)
    }
  }
  
export default connect(null, mapDispatchToProps)(ContentText);

