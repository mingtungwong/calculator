import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import Home from './components/Home.jsx';
import ServantList from './components/ServantList.jsx';
import { Switch, Route, HashRouter } from 'react-router-dom';

ReactDOM.render((
    <HashRouter>
        <App >
            <Route path="/servants" component={ServantList}/>
            <Route path="/" exact component={Home}/>
        </App>
    </HashRouter>

), document.getElementById('root'));