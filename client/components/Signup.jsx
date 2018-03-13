import React from 'react';
import { Form, FormGroup, FormControl, Col, ControlLabel, Button } from 'react-bootstrap';

export default class Signup extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        const passwordValidation = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$");
        const email = event.target.signupHorizontalEmail.value;
        const password = event.target.signupHorizontalPassword.value;
        const confirmPassword = event.target.signupHorizontalConfirmPassword.value;
        console.log(email, password, confirmPassword);
        console.log(passwordValidation.test(password));
    }

    render() {
        return (
            <Form horizontal onSubmit={this.handleSubmit}>
                <FormGroup controlId="signupHorizontalEmail">
                    <Col sm={4} smOffset={4}>
                        <FormControl type="email" placeholder="Email" minLength="1"/>
                    </Col>
                </FormGroup>
                <FormGroup controlId="signupHorizontalPassword">
                    <Col sm={4} smOffset={4}>
                        <FormControl type="password" placeholder="Password"/>
                    </Col>
                </FormGroup>
                <FormGroup controlId="signupHorizontalConfirmPassword">
                    <Col sm={4} smOffset={4}>
                        <FormControl type="password" placeholder="Confirm Password"/>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col sm={4} smOffset={4}>
                        <Button type="submit">Submit</Button>
                    </Col>
                </FormGroup>
            </Form>
        )
    }
}