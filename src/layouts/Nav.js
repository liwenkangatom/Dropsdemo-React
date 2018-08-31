import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
const navstyle = {
        float: 'left',
        color: '#fff',
        margin: '10px'
}
const navboxstyle ={
    border: '0px solid',
    width: '100%',
    height: '40px'
}
class Nav extends Component {
    render() {
        return (
            <div className='nav' style={navboxstyle}>
                <nav style={navstyle}>
                    <NavLink to='/'>Home</NavLink>
                </nav>
                <nav style={navstyle}>
                    <Link to='/drops'>EventDrops</Link> 
                </nav>
                <nav style={navstyle}>
                    <Link to='/about'>About</Link> 
                </nav>
            </div>
        )
    }
}
export default Nav