import React, {Component} from 'react'
import PropTypes from 'prop-types'


class AddDialog extends Component {
    static propsTypes = {
        isOpen: PropTypes.bool.isRequired,
        title: PropTypes.string.isRequired,
        children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
        className: PropTypes.string,
        maskClosable: PropTypes.bool,
        onCancel: PropTypes.func,
        onOk: PropTypes.func,
        okText: PropTypes.string,
        cancelText: PropTypes.string
    }
    static defaultProps = {
        className: 'heloo',
        maskClosable: true,
        onCancel: () => {},
        onOk: () => {},
        okText: 'OK',
        cancelText: 'Cancel'
    }
    constructor(props) {
        super(props),
        this.state = {
            isOpen: props.isOpen || false
        }
    }
    componentWillReceiveProps(nextProps) {
        if('isOpen' in nextProps){
            this.setstate({
                isOpen: nextProps.isOpen
            })
        }
    }
    render(){
        const {
            title,
            children,
            className,
            okText,
            cancelText,
            onOk,
            onCancel,
            maskClosable
        } = this.props
        return (
            <div className={`modal-container ${className}`}>
                <div className="modal-body">
                    <div className={`modal-title`}>{title}</div>
                <div className="modal-content">{children}</div>
                <div className="modal-footer">
                    <button className="ok-btn" onClick={onOk}>{okText}</button>
                    <button className="cancel-btn" onClick={onCancel}>{cancelText}</button>
                </div>
                </div>
            </div>
        )
    }
    
}
export default AddDialog