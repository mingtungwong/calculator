import React from 'react';
import { Link } from 'react-router';
import NavigationBar from './NavigationBar.jsx';

export default class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <NavigationBar />
            </div>
        )
    }
}