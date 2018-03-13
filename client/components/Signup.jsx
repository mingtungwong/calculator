import React from 'react';
import { Form, FormGroup, FormControl, Col, ControlLabel, Button, HelpBlock } from 'react-bootstrap';

export default class Signup extends React.Component {
    constructor() {
        super();
        this.state = {
            signupEmail: "",
            signupPassword: "",
            signupConfirmPassword: "",
            passwordValidationState: null,
            confirmPasswordValidationState: null,
            emailValidationState: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.validate = this.validate.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
    }

    handleSubmit(event) {
        const { signupEmail, signupPassword, signupConfirmPassword } = this.state;
        if(this.state.passwordValidationState === "success"
            && this.state.confirmPasswordValidationState === "success"
            && this.state.emailValidationState === "success") {
                console.log("Success!");
        }
    }

    handleChange(event) {
        this.setState({[event.target.id]: event.target.value}, () => {this.validate()});
    }

    validate() {
        const passwordValidation = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$");
        const passwordValidationState = passwordValidation.test(this.state.signupPassword) ? "success" : "error";
        const confirmPasswordValidationState = this.state.signupPassword === this.state.signupConfirmPassword ? "success" : "error";
        const emailValidationState = this.validateEmail() ? "success" : "error";
        this.setState({ passwordValidationState, confirmPasswordValidationState, emailValidationState });
    }

    validateEmail() {
        const { signupEmail } = this.state;
        const atIndex = signupEmail.indexOf('@');
        const dotIndex = signupEmail.indexOf('.');
        return signupEmail.length > 5 && atIndex > -1 && dotIndex > -1 && atIndex < dotIndex;
    }

    render() {
        return (
            <Form horizontal onSubmit={this.handleSubmit}>
                <FormGroup controlId="signupEmail" onChange={this.handleChange}>
                    <Col sm={4} smOffset={4}>
                        <FormControl type="text" placeholder="Email"/>
                    </Col>
                </FormGroup>
                {
                    this.state.emailValidationState === "error" ?
                    <FormGroup validationState="error">
                        <HelpBlock>
                            Invalid email address!
                        </HelpBlock>
                    </FormGroup>
                    : null
                }
                <FormGroup
                    controlId="signupPassword"
                    onChange={this.handleChange}
                    validationState={this.state.passwordValidationState}   
                >
                    <Col sm={4} smOffset={4}>
                        <FormControl type="password" placeholder="Password"/>
                    </Col>
                </FormGroup>
                {
                    this.state.passwordValidationState === "error" ?
                    <FormGroup validationState="error">
                        <HelpBlock>
                            Minimum 8 characters, 1 Uppercase, 1 Lowercase, and 1 Number
                        </HelpBlock>
                    </FormGroup>
                    : null
                }
                <FormGroup
                    controlId="signupConfirmPassword"
                    onChange={this.handleChange}
                    validationState={this.state.confirmPasswordValidationState}
                >
                    <Col sm={4} smOffset={4}>
                        <FormControl type="password" placeholder="Confirm Password"/>
                    </Col>
                </FormGroup>
                {
                    this.state.confirmPasswordValidationState === "error" ?
                    <FormGroup validationState="error">
                        <HelpBlock>
                            Passwords do not match!
                        </HelpBlock>
                    </FormGroup>
                    : null
                }
                <FormGroup>
                    <Col sm={4} smOffset={4}>
                        <Button type="submit">Submit</Button>
                    </Col>
                </FormGroup>
            </Form>
        )
    }
}