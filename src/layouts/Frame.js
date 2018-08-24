import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Nav from './Nav'
import Home from '../views/Home'
import Drops from '../components/Drops/Drops'

class Frame extends Component {
    render() {
        return (
            <div className='frame'>
                <section className='header'>
                    <Nav />
                </section>
                <section className='container'>
                    <Route path='/home' Component={Home}></Route>
                    <Route path='/drops'Component={Drops}></Route>
                </section>
            </div>
        )
    }
}
export default Frame