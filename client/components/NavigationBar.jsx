import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

export default class NavigationBar extends React.Component {
    render() {
        return (
            <Navbar style={{backgroundColor: "#178bd8"}}>
                <Navbar.Header>
                    <Navbar.Brand style={{paddingTop: "0"}}>
                        <Link to="/" className="navbar-left"><img src="/public/assets/logos/fgo_logo.png" height="63px" width="112px"/></Link>
                    </Navbar.Brand>
                </Navbar.Header>
                {/* <Nav>
                    <NavItem eventKey={1} onClick={ e => this.props.history.push("/servants")}>Servants</NavItem>
                </Nav> */}
            </Navbar>
        )
    }
}