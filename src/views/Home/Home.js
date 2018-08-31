import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { homeActions } from './HomeRedux'
const { testActions, dropsActions, modalActions } = homeActions
class Home extends Component {
    render() { console.log(this.state)
        const { dropValue, dropAction, testValue, testActon, modalValue, modalAction } = this.props
        return (
            <div className='home'>
                <h1>HOME PAGE</h1>
                <br></br><h4>drops</h4>
                <button onClick={dropAction}>click1</button>
                {dropValue}
                <br></br><h4>modal</h4>
                <button onClick={modalAction}>click2</button>
                {modalValue}
                <br></br><h4>test</h4>
                <button onClick={testActon}>click3</button>
                {testValue}
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log(state)
    return {
        dropsValue: state.drop.events,
        testValue: state.test.testValue,
        modalValue: state.modal.modalVisible
    }
}
function mapDispatchToProps(dispatch) {
    return {
        dropAction: bindActionCreators(dropsActions.loadEvents, dispatch),
        testAction: bindActionCreators(testActions.testActionDelete, dispatch),
        modalAction: bindActionCreators(modalActions.ModalActionCreator, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)