import React, { Component } from 'react';
import { Provider } from 'react-redux';
import './App.css';
import {store} from './redux'
import Home from './views/Home'
class App extends Component {
  render() {
    return (
      <div className="App">
      <Provider store={store}>
        <Home></Home>
      </Provider>
      </div>
    );
  }
}

export default App;