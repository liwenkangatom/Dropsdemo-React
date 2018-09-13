import React, { Component } from 'react'
import {TreeSelect, Tree} from 'antd'
import ContextMenu from './ContextMenu'
const TreeNode = TreeSelect.TreeNode
export default class Node extends Component {
  constructor(props){
    super(props)
    this.state = {
      visible:false
    }
  }
 
  render() {
    const { addState, changeState, deleteState, title } = this.props
    let show ={
      'display': 'block'
    }
    let unshow = {
      
      'display': 'none'
    }
    return (
      <TreeNode>
        <TreeNode
          style={deleteState?show:unshow}
          title= {changeState?<input placeholder={title}>
          </input>:<ContextMenu>{title}</ContextMenu>}
        >
          <TreeNode
            style={addState?show:unshow}
            title={<input></input>}
          >
          </TreeNode>
        </TreeNode>
      </TreeNode>
    )
  }
}
