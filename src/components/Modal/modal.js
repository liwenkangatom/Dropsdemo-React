import React, {Component} from 'react'
import {createPortal} from 'react-dom'

const modalRoot = document.body
class Chil extends Component {
    render() {
        return (
            <div>test for createPortal</div>
        )
    }
}
class Modal extends Component {
    render() {
        return createPortal(
            <Chil />,
            modalRoot
        )
    }
}
export default Modal