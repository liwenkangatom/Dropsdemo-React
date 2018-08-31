import React, { Component } from 'react'
import LeftSlideBar from '../components/LeftSlideBar'
import Drops from '../components/Drops'

class EventManage extends Component {
    render () {
        return (
            <div className='EventManage'>
                <LeftSlideBar></LeftSlideBar>
                <Drops></Drops>                
            </div>
            
        )
    }
}
export default EventManage