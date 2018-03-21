import React from 'react';
import Header from './Header.jsx';
import ServantList from './ServantList.jsx';
import { Provider } from 'react-redux';
import store from '../store/store.js';

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <div>
                    <Header />
                    {this.props.children}
                </div>
            </Provider>
        )
    }
}