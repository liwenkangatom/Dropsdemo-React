import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './Tooltips.css';
class Tooltips extends Component {
<<<<<<< HEAD:src/components/ToolTips/Tooltips.js
static defaultProps = {
  commit: 'helle',
  name: 'hahah'
}
  render() {
    
    console.log(this.props);
=======

  render() {
    const { commit } = this.props; 

>>>>>>> c13aeddec839de328cfa3f7ff7d24e07fd71e210:src/Tooltips.js
    return (
      
      <div className='tooltip'>
        <div className="commit">
            <img className="avatar" 
              src={"https://www.gravatar.com/avatar/" + commit.author.email}
              alt={commit.author.name}
              title={commit.author.name} 
            />
            <div className="content">
                <h3 className="message"> {commit.message} </h3>
                <p>
                    <span className="data">{commit.date}</span>
                    -
                    <span className='sha'>{commit.sha}</span>
                </p>
            </div>
        </div>
      </div>
    );
  }
}

export default Tooltips;