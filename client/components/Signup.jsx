import React from 'react';
import { Form, FormGroup, FormControl, Col, ControlLabel, Button } from 'react-bootstrap';

export default class Signup extends React.Component {
    constructor() {
        super();
        this.state = {
            signupEmail: "",
            signupPassword: "",
            signupConfirmPassword: "",
            passwordValidationState: null,
            confirmPasswordValidationState: null   
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.validate = this.validate.bind(this);
    }

    handleSubmit(event) {
        const passwordValidation = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$");
        const { signupEmail, signupPassword, signupConfirmPassword } = this.state;
    }

    handleChange(event) {
        this.setState({[event.target.id]: event.target.value}, () => {this.validate()});
    }

    validate() {
        const passwordValidation = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$");
        const passwordValidationState = passwordValidation.test(this.state.signupPassword) ? "success" : "error";
        const confirmPasswordValidationState = this.state.signupPassword === this.state.signupConfirmPassword ? "success" : "error";
        this.setState({ passwordValidationState, confirmPasswordValidationState });
    }

    render() {
        return (
            <Form horizontal onSubmit={this.handleSubmit}>
                <FormGroup controlId="signupEmail" onChange={this.handleChange}>
                    <Col sm={4} smOffset={4}>
                        <FormControl type="email" placeholder="Email" minLength="1"/>
                    </Col>
                </FormGroup>
                <FormGroup
                    controlId="signupPassword"
                    onChange={this.handleChange}
                    validationState={this.state.passwordValidationState}    
                >
                    <Col sm={4} smOffset={4}>
                        <FormControl type="password" placeholder="Password"/>
                    </Col>
                </FormGroup>
                <FormGroup
                    controlId="signupConfirmPassword"
                    onChange={this.handleChange}
                    validationState={this.state.confirmPasswordValidationState}
                >
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