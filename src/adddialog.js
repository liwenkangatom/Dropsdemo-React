import React, {Compoment} from 'react'
import PropsTypes from 'prop-types'


class AddDialog extends Compoment {
    static propsTypes = {
        tag: PropsTypes.object
    }
    constructor(props) {
        super(props),
        this.state.tag = props.tag
    }
    render(){
        return (
            <div className='dialog'>
                <h1>this is dialog for add evnet</h1>
            </div>
        )
    }
}
export default AddDialog