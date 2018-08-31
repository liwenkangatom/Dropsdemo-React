import React, { Component } from 'react'

class Test extends Component {
    render() {
        const {testAction, testValue} = this.props.
        return (
            <div onClick={testAction}>
                {testValue}
            </div>
        )
    }
}
export default Test