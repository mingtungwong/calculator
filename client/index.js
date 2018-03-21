import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import Home from './components/Home.jsx';
import ServantList from './components/ServantList.jsx';
import ServantProfile from './components/ServantProfile.jsx';
import EditMenuPage from './components/EditMenuPage.jsx';
import EditAscensions from './components/EditAscensions.jsx';
import AddServant from './components/AddServant.jsx';
import AddClass from './components/AddClass.jsx';
import Signup from './components/Signup.jsx';
import { Switch, Route, HashRouter } from 'react-router-dom';

ReactDOM.render((
    <HashRouter>
        <App>
            <Route path="/edit/add/class" component={AddClass} />
            <Route path="/edit/add/servant" component={AddServant}/>
            <Route path="/edit/add/ascensions" component={EditAscensions}/>
            <Route path="/signup" component={Signup} />
            <Route path="/menu" component={EditMenuPage}/>
            <Route path="/servant/:id" exact component={ServantProfile} />
            <Route path="/servants" component={ServantList}/>
            <Route path="/" exact component={Home}/>
        </App>
    </HashRouter>
), document.getElementById('root'));