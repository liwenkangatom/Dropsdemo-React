import React, { Component } from 'react';
import './style.css';
import { humanizeDate } from '../utils';

import {connect } from 'react-redux';
class Tooltips extends Component {

  render() {
    const { showcommit } = this.props; 
    return (
      
      <div className='tooltip'>
        <div className="commit">
            <div className="content">
                <p>{showcommit.subject}</p>
                <p>{humanizeDate(new Date(showcommit.date))}</p>
            </div>
        </div>
      </div>
    );
  }
}

function  mapStateToProps(state) {
  return {
      showcommit: state.event.showcommit,
  }
}

export default connect(mapStateToProps, null)(Tooltips);