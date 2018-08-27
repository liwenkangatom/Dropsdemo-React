import React, { Component } from 'react'
import {BrowserRouter as Router } from 'react-router-dom'
import Nav from './Nav'
class Frame extends Component {
    render() {
        return (
            <Router>
                <section className='header'>
                    <Nav />
                    <hr></hr>
                    {this.props.children}
                </section>
            </Router>
        )
    }
}
export default Frame