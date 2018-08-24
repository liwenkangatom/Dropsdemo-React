import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './Tooltips.css';
class Tooltips extends Component {
static defaultProps = {
  commit: 'helle',
  name: 'hahah'
}
  render() {
    
    console.log(this.props);
    return (
      <div className='tooltip'>
        <div className="commit">
            <div className="avatar"></div>
            <div className="content">
                <h3 className="message"> </h3>
                <p>
                    <span className="data"></span>
                    -
                    <span className='sha'></span>
                </p>
            </div>
        </div>
      </div>
    );
  }
}

export default Tooltips;