import React, { Component } from 'react'


const headerStyle = {
    width: '100%',
    height: '100px',
    background: '#335',
    border: 'solid 1px'
}
const tittleStyle = {
    color: '#fff'
}
export default class Header extends Component {
    render() {
        return (
            <div className='header' style={headerStyle}>
                <div className='tittle' style={tittleStyle}>
                    <h1>Event Track & Presentation System</h1>
                </div>
            </div>
        )
    }
}