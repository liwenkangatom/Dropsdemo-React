// 无状态组件
import React, {Component} from 'react'
// import PropTypes from 'prop-types'
import {Table} from 'antd'

const colums =[{
    tittle: '标签id',
    dataIndex: 'pKey'
}, {
    tittle: '标签名',
    dataIndex: 'Name'
}, {
    tittle: '父标签id',
    dataIndex: 'tag_parents'
}]

class TestTable extends Component {
    constructor(props){
        super(props)
    }
    render () {
        return (
            <Table colums={colums} data={this.props.tags}></Table>
        )
    }
}
export default TestTable