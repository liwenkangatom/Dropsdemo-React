import React, { Component } from 'react'
// import {connect} from 'react-redux'
import TreeBar from '../../components/TreeBar'
import EventDrop from '../../components/EventDrop'
import Header from '../../components/Header'

// import {actions} from '../../redux'

import './home.css'
// import { bindActionCreators } from 'redux';

class Home extends Component {
    
    // componentWillMount() {
    //     this.props.inittags()
    // }
    
    render() {
        // const { gData, addtag, inittags, renametag, deletetag, onselecttag } = this.props
        return (
            <div className='Home'>
                <div className='header'>
                    <Header></Header>
                </div>
                <div className='section'>
                    <div className='sider'>
                        <TreeBar>
                            <EventDrop></EventDrop>
                        </TreeBar>
                    </div>
                </div>
            </div>
        )
    }
}

// const mapStateToProps=(state)=>{
//         console.log(state)
//     return {
//         gData: state.home.treebar.gData,
//         selectedkeys: state.home.treebar.selectedkeys
//     }
// }
// const mapDispatchToProps= dispatch => {
//     console.log(actions)
//     return {
//         inittags: bindActionCreators(actions.home.treebar.refreshtags,dispatch),
//         renametag: bindActionCreators(actions.home.treebar.renametag,dispatch),
//         deletetag: bindActionCreators(actions.home.treebar.deletetag,dispatch),
//         addtag: bindActionCreators(actions.home.treebar.addtag,dispatch),
//         onselecttag: bindActionCreators(actions.home.treebar.onSelect,dispatch)
//     }
    
// }
export default Home