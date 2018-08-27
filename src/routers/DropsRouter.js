import React, { Component } from 'react'
import { Route, HashRouter } from 'react-router-dom'
import Home from '../views/Home'
import Frame from '../layouts/Frame'
class DropsRouter extends Component {
    render() {
        return (
            <HashRouter basename='/framw'>
                <Route path='/Home' Component={Home}></Route>
            </HashRouter>
        )
    }
}
export default DropsRouter