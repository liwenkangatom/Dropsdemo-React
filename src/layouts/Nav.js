import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Nav extends Component {
    render() {
        return (
            <div className='nav'>
                <nav>
                    <Link to='/'>Home</Link>
                </nav>
                <nav>
                    <Link to='/home'>root</Link>
                </nav>
            </div>
        )
    }
}
export default Nav