import React, { Component } from 'react';
import './App.css';
// import Dropsdemo from './Test'
// import Modal from './modal'
import DropsRooter from './routers/DropsRouter'
class App extends Component {
  render() {
    return (
      <div className="App">
        <DropsRooter />
      </div>
    );
  }
}

export default App;
