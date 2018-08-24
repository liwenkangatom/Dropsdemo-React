import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route } from 'react-router-dom'
import App from './App';
import Home from './views/Home'
import Frame from './layouts/Frame'

ReactDOM.render(
    <BrowserRouter>
        <Route path='/' component={Frame}>
        </Route>
    </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();