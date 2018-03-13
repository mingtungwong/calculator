import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, PageHeader, Form, FormGroup, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default class NavigationBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showLoginBox: false
        }
        this.toggleShowLogin = this.toggleShowLogin.bind(this);
    }

    toggleShowLogin() {
        this.setState({showLoginBox: !this.state.showLoginBox});
    }

    render() {
        return (
            <div>
                <Navbar fluid style={{backgroundColor: "#45b5fa"}}>
                    <Navbar.Header>
                        <Navbar.Brand style={{paddingTop: "0"}}>
                            <Link to="/" className="navbar-left"><img src="/public/assets/logos/fgo_logo.png" height="63px" width="112px"/></Link>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <LinkContainer to="/servants">
                                <NavItem>Servants</NavItem>
                            </LinkContainer>
                            <LinkContainer to="/menu">
                                <NavItem>Edit</NavItem>
                            </LinkContainer>
                        </Nav>
                        <Nav pullRight onSelect={this.toggleShowLogin}>
                            <NavItem>Login</NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}