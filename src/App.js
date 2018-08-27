import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import './App.css';
import Dropsdemo from './components/Drops/Drops'
import Home from './views/Home'
import Frame from './layouts/Frame'
import axios from 'axios'
import store from './store'
const About = () => (
  <div>
    <h2>About</h2>
  </div>
);
class App extends Component {
 
  componentDidMount() {
    axios.get('/date.json').then((res) => {
      const data = res.data;
      const action = {
          type: 'init_redux',
          data: data
      }
      store.dispatch(action)
    })
  }

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