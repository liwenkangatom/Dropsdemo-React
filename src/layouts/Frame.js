import React, { Component } from 'react'
import {BrowserRouter as Router } from 'react-router-dom'
import Nav from './Nav'
import Header from './Header'
import Footer from './Footer'
import Parent from '../components/Modal/modal.js'
const sectionStyle = {
    height: '700px'
}
class Frame extends Component {
    render() {
        return (
            <Router>
                <div className='routerroot' id='modal-root'>
                    <Header></Header>
                    <section className='navheader' style={sectionStyle}>
                        <Nav />
                        <hr></hr>
                        {this.props.children}
                    </section>
                    <Parent></Parent>
                    <Footer></Footer>
                </div>
            </Router>
        )
    }
}
export default Frame