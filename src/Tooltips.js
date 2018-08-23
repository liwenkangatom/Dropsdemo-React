import React, { Component } from 'react';
import './Tooltips.css';
class Tooltips extends Component {
  render() {
    const { PID, subject, DateTime, content } = this.props;
    return (
      <div className ="tooltip">
        <div className="commit">
            <div className="avatar">{PID}</div>
            <div className="content">
                <h3 className="message">{subject}</h3>
                <p>
                    <span className="data">{DateTime}</span>
                    -
                    <span className='sha'>{content}</span>
                </p>
            </div>
        </div>
      </div>
    );
  }
}

export default Tooltips;
