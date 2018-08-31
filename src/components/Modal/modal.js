import React, {Component} from 'react'
// import {createPortal} from 'react-dom'
import Modal from 'react-modal'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
}
class ModalDemo extends Component {
    constructor(props) {
        super(props)
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.state = {
            modalIsOpen: false
        }   
    }
    
    componentWillMount() {
        const el = document.getElementById('root')
        Modal.setAppElement(el)
    }
    
    openModal() {
        this.setState({modalIsOpen: true})
    }
    afterOpenModal() {
        
    }
    closeModal() {
        this.setState({modalIsOpen: false})
    }
    render() {
        return (
        <div>
            <button onClick={this.openModal}>Open Modal</button>
            <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h2 ref="subtitle">Hello</h2>
                <button onClick={this.closeModal}>close</button>
                <div>I am a modal</div>
                <form>
                    <input />
                    <button>tab navigation</button>
                    <button>stays</button>
                    <button>inside</button>
                    <button>the modal</button>
                </form>
            </Modal>
        </div>
        )
    }
}

// class Modal extends Component {
//   constructor(props) {
//     super(props);
//     this.el = document.createElement('div');
//   }

//   componentDidMount() {
//     modalRoot.appendChild(this.el);
//   }

//   componentWillUnmount() {
//     modalRoot.removeChild(this.el);
//   }

//   render() {
//     return createPortal(
//       this.props.children,
//       this.el,
//     );
//   }
// }

// class Parent extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {clicks: 0};
//     this.handleClick = this.handleClick.bind(this);
//   }

//   handleClick() {
//     // This will fire when the button in Child is clicked,
//     // updating Parent's state, even though button
//     // is not direct descendant in the DOM.
//     this.setState(prevState => ({
//       clicks: prevState.clicks + 1
//     }));
//   }

//   render() {
//     return (
//       <div onClick={this.handleClick}>
//         <p>Number of clicks: {this.state.clicks}</p>
//         <p>
//           Open up the browser DevTools
//           to observe that the button
//           is not a child of the div
//           with the onClick handler.
//         </p>
//         <Modal>
//           <Child />
//         </Modal>
//       </div>
//     );
//   }
// }

// function Child() {
//   // The click event on this button will bubble up to parent,
//   // because there is no 'onClick' attribute defined
//   return (
//     <div className="modal">
//       <button>Click</button>
//     </div>
//   );
// }

export default ModalDemo 