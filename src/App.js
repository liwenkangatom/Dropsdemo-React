import React, { Component } from 'react';
import './App.css';
import Dropsdemo from './Test'
import Modal from './modal'

class App extends Component {
  render() {
    return (
      <div className="App">
    <header className="App-header">
          <h1 className="App-title">Dropsdemo-React</h1>
        </header>
        <Dropsdemo />
        <Modal />
      </div>
    );
  }
}

export default App;
