import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Navbar, Nav, NavItem, PageHeader } from 'react-bootstrap';
import { Form, FormGroup, FormControl, Col, ControlLabel, Checkbox, Button, HelpBlock } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import axios from 'axios';
import config from '../../config.json';
import { connect } from 'react-redux';

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
            //Do something with setting the token in redux store then push to different route
            console.log(token);
            this.props.history.push('/servants');
        })
        .catch(error => this.setState({ showLoginError: true })); 
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
    console.log(state);
    return {

    }
}

export default withRouter(connect(mapStateToProps)(NavigationBar));