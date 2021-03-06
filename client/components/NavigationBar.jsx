import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { NavDropdown, Navbar, Nav, NavItem, MenuItem, PageHeader } from 'react-bootstrap';
import { Form, FormGroup, FormControl, Col, ControlLabel, Checkbox, Button, HelpBlock } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import axios from 'axios';
import config from '../../config.json';
import { connect } from 'react-redux';
import { setUser } from '../store/user';
import _ from 'lodash';

class NavigationBar extends React.Component {

    constructor() {
        super();
        this.state = {
            showLoginBox: false,
            showLoginError: false
        }
        this.toggleShowLogin = this.toggleShowLogin.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleShowLogin() {
        this.setState({showLoginBox: !this.state.showLoginBox});
    }

    handleSubmit(event) {
        const email = event.target.loginEmail.value;
        const password = event.target.loginPassword.value;
        axios.post(`${config.server}/api/authentication/login`, { email, password })
        .then(res => res.data)
        .then(token => {
            this.props.setLoggedInUser(token);
            this.setState({ showLoginBox: false });
        })
        .catch(error => this.setState({ showLoginError: true })); 
    }

    render() {
        const { user } = this.props;
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
                        {
                            _.isEmpty(user)
                            ?
                                <Nav pullRight onSelect={this.toggleShowLogin}>
                                    <NavItem>Login</NavItem>
                                </Nav>
                            :
                                <Nav pullRight>
                                    <NavDropdown title="Account" id="account-drop-down">
                                        <MenuItem onClick={() => this.props.setLoggedInUser({})}>Logout</MenuItem>
                                    </NavDropdown>
                                </Nav>
                        }
                    </Navbar.Collapse>
                </Navbar>
                <div id="login-box" style={{display: this.state.showLoginBox ? "block" : "none"}}>
                    <Form horizontal style={{paddingTop: "10px"}} onSubmit={this.handleSubmit}>
                        {
                            this.state.showLoginError ?
                            <FormGroup validationState="error">
                                <HelpBlock>
                                    Invalid email or password
                                </HelpBlock>
                            </FormGroup>
                            : null
                        }
                        <FormGroup controlId="loginEmail">
                            <Col />
                            <Col sm={9} smOffset={2}>
                                <FormControl type="text" placeholder="Email" />
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="loginPassword">
                            <Col sm={9} smOffset={2}>
                                <FormControl type="password" placeholder="Password" />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col smOffset={2} sm={9}>
                                <Button type="submit">Sign in</Button>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col smOffset={5} sm={3}>
                                <Link to="/signup" onClick={this.toggleShowLogin}>Signup</Link>
                            </Col>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setLoggedInUser: (user) => dispatch(setUser(user)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavigationBar));