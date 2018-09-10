
import React, { Component } from 'react';
import {Provider} from 'react-redux'

import Header from './components/Header';
import LeftSlideBar from './components/LeftSlideBar'
import Manage from './views/EventManage'
import { store } from './redux/reduxconfigure'
// import Tree from './components/Test/Test'



class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <div>
        <Header/>
        <LeftSlideBar/>
      </div>
      </Provider>
      // <Tree></Tree>
    );
  }
}
export default App;
