import React, { Component } from 'react'

class Sider extends Component {
    render() {
        return (
            <div className='sider'>
                <div className='siderseach'>
                    <input type='text'></input>
                    <div className='searchimg'></div>
                </div>
                <div className='siderheader'>
                    
                    <div className='sidertittle'>
                        Tags
                    </div>
                    <div className='siderbutton'>
                        <button>Add</button>
                    </div>
                </div>
                <div className='sidercontainner'>
                    {this.props.children}
                </div>
            </div>
        )
    }
}
export default Sider