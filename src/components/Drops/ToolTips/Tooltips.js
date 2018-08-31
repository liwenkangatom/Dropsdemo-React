import React, { Component } from 'react';
import './style.css';
import { humanizeDate } from '../utils'
class Tooltips extends Component {

  render() {
    const { commit } = this.props; 
    return (
      
      <div className='tooltip'>
        <div className="commit">
            <div className="content">
                <p>{commit.subject}</p>
                <p>{humanizeDate(new Date(commit.date))}</p>
            </div>
        </div>
      </div>
    );
  }
}

export default Tooltips;