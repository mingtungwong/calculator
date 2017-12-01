import React from 'react';
import Header from './Header.jsx';
import ServantList from './ServantList.jsx';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <ServantList />
            </div>
        )
    }
}