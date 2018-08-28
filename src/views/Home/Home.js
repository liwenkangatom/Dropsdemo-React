import React, { Component } from 'react'
import {connect} from 'react-redux'

import TestTable from '../../components/Table/Table'
import {tableActions } from './HomeRedux' 



class Home extends Component {
    render() {
        return (
            <div className='home'>
                <h1>HOME PAGE</h1>
            </div>
        )
    }
}
export default Home