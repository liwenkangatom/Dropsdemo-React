import React, { Component } from 'react';
import './Tooltips.css';


class Tooltips extends Component {

  render() {
    const { commit } = this.props; 

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
