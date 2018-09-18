import React, { Component } from 'react'
import {Layout, }
export default class SiderContent extends Component {
  render() {
    return (
      <div>
        <Sider          
          onDoubleClick={this.addRootTag}
          collapsible
          collapsed={collapsed}
          collapsedWidth='0'
          trigger={null}
          width={siderwidth}
          style={{backgroundColor: '#fff'}}
        >
        <div className="siderwraper">
          <SearchWrapper>
            <Search 
            onChange={this.onchangeHandle}
            onClick={this.exitEdit}
            />
            <Icon 
              type="search" 
              style={{ fontSize: 14,
                       color: '#d2d2d2',
                       position: 'relative',
                       right: '170px'
                    }}
              />
          </SearchWrapper>  
          <Tags>
              <Text>Tags</Text>
              <div onClick={this.addRootTag}>
              	<Add >
                	<Icon type="plus"/>
              	</Add>
              </div>      
          </Tags>
          <Tree
          checkable
          checkStrictly={true}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          onExpand={this.onExpandHandle}
          onCheck={this.onCheckHandle}
          selectedKeys={selectedKeys}>
           {loop(this.state.treeData)}
           <TreeNode 
            style={(addroot)?visible:unvisible} 
            title={<Input 
                    // onPressEnter={()=>{this.setState({addroot: false},addTag(this.state.addvalue, null))}} 
                    onPressEnter={this.addrootaction} 
                    onChange={(e)=>{this.setState({addvalue: e.target.value})}} 
                    value={this.state.addvalue}
                    size="small"
                    style={{width: "50px"}}>
                    </Input>}>
            </TreeNode>
          </Tree>
          <ContextMenu id="some_unique_identifier">
            {menuitem}
          </ContextMenu>
        </div>
        <div className="slider" 
        onDrag={(e)=>{e.persist 
        this.setState({siderwidth: e.clientX})}} 
        onDragEnd={(e)=>{
          if(!this.state.collapsed){
            if (e.clientX <= 200) {
              this.setState({
                siderwidth: 200
              })
              this.props.setsider(200)
            } else if (e.clientX >= 500) {
              this.setState({
                siderwidth: 500
              })
              this.props.setsider(500)
            } else {
              this.setState({
                siderwidth: e.clientX
              }) 
              this.props.setsider(e.clientX)
            }
          }else{
            this.props.setsider(0)
          }
        }}>

        </div> 

        </Sider>
      </div>
    )
  }
}
