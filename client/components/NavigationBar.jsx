import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, PageHeader } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default class NavigationBar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Navbar style={{backgroundColor: "#45b5fa"}}>
                <Navbar.Header>
                    <Navbar.Brand style={{paddingTop: "0"}}>
                        <Link to="/" className="navbar-left"><img src="/public/assets/logos/fgo_logo.png" height="63px" width="112px"/></Link>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <LinkContainer to="/servants">
                        <NavItem>Servants</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/menu">
                        <NavItem>Edit</NavItem>
                    </LinkContainer>
                </Nav>
            </Navbar>
        )
    }
}