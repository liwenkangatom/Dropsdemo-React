import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import './App.css';
import Dropsdemo from './components/Drops/Drops'
import Home from './views/Home'
import Frame from './layouts/Frame'

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);
class App extends Component {
  render() {
    return (
        <Frame>
          <Route exact path='/' component={Home} />
          <Route path='/about' component={About} />
          <Route path='/drops' component={Dropsdemo} />
        </Frame>
    );
  }
}
export default App;