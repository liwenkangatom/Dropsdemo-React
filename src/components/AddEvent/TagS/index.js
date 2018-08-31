import React,{ Component } from 'react';
import { Tag, Input, Tooltip, Icon } from 'antd';
import 'antd/dist/antd.css';
import {
  Add
} from './style'
class TagS extends Component {
    constructor(props){
        super(props);
        this.state = {
            tags: [ 'Tag 1', 'Tag 2', 'Tag 3'],
            inputVisible: false,
            inputValue: '',
        }
    }

    handleClose = (removedTag) => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        this.setState({ tags });
      }
    
      showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
      }
    
      handleInputChange = (e) => {
        this.setState({ inputValue: e.target.value });
      }
    
      handleInputConfirm = () => {
        const state = this.state;
        const inputValue = state.inputValue;
        let tags = state.tags;
        if (inputValue && tags.indexOf(inputValue) === -1) {
          tags = [...tags, inputValue];
        }
        console.log(tags);
        this.setState({
          tags,
          inputVisible: false,
          inputValue: '',
        });
      }
    
      saveInputRef = input => this.input = input

    render(){
        const { tags, inputVisible, inputValue } = this.state;
    return (
      <div style={{display:'inline-block',marginLeft:22,minHeight:32}}>
        {tags.map((tag, index) => {
          const isLongTag = tag.length > 20;
          let color;
          if ( index % 3 === 0 ) {
             color = 'rgb(116, 96, 238)'
          } else if ( index % 3 === 1 ) {
            color = 'rgb(10, 173, 246)'
          } else {
            color = 'rgb(40, 201, 109)'
          }
          const tagElem = (
            <Tag 
              key={tag} 
              closable={true} 
              afterClose={() => this.handleClose(tag)} 
              color={color}
            >
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </Tag>
          );
          return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
        })}
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag
            onClick={this.showInput}
            style={{ 
              background: '#fff',
              border:'0px',
            }}
          >
            <Add><Icon type="plus" />Tag</Add>
          </Tag>
        )}
      </div>
    );
    }
}

export default TagS;