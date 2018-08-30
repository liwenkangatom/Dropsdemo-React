import React, { Component } from 'react';
import Header from './components/Header';
import LeftSlideBar from './components/LeftSlideBar'
class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <LeftSlideBar/>
      </div>
    );
  }
}
export default App;