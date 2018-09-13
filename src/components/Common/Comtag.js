import React,{ Component } from 'react';
import { Tag, Tooltip, Icon, TreeSelect } from 'antd';
import 'antd/dist/antd.css';
import {
  Add
} from './style';
const TreeNode = TreeSelect.TreeNode

class Comtag extends Component {
    render(){
		const loop = data => data.map(item => {
			if (item.children) {
				return (
				  <TreeNode key={item.key} value={item.title} title={item.title}>
					{loop(item.children)}
				  </TreeNode>
				);
			  }
			  return <TreeNode key={item.key} value={item.title} title={item.title} />;
			}
		)
        const { tags, inputVisible, onChange, gData, handleClose, showInput } = this.props;
        return(
            <div style={{display:'inline-block',minHeight:32,maxWidth:468}}>
            {tags.map((tag, index) => {
              const key = tag[0];
              const title = tag[1];
              const isLongTag = title.length > 20;
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
                  key={key} 
                  closable={true} 
                  afterClose={() => handleClose(key)} 
                  color={color}
                >
                  {isLongTag ? `${title.slice(0, 20)}...` : title}
                </Tag>
              );
              return isLongTag ? <Tooltip title={title} key={key}>{tagElem}</Tooltip> : tagElem;
            })}
            {inputVisible && (
              <TreeSelect
                showSearch
                style={{ width: 123 }}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="Please select"
                onChange={onChange}
                treeDefaultExpandAll
              >
			  	{loop(gData)}
			  </TreeSelect>
  
            )}
            {!inputVisible && (
              <Tag
                onClick={showInput}
                style={{ 
                  background: '#f8fafb',
                  border:'0px',
                }}
              >
              <Add><Icon type="plus" />Tag</Add>
              </Tag>
            )}
          </div>
        )
    }
}

export default Comtag;