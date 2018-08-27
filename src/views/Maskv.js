import React, { Component } from 'react'
const maskStyle = {
    width: '100%',
    height: '100%',
    background: '#000'
}
class Maskv extends Component {
    render () {
        return (
            <div className='mask' style={maskStyle}>

            </div>
        )
    }
}
export default Maskv