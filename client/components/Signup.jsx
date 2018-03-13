import React from 'react';
import { Form, FormGroup, FormControl, Col, ControlLabel, Button } from 'react-bootstrap';

export default class Signup extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Form horizontal>
                <FormGroup controlId="signupHorizontalEmail">
                    <Col sm={4} smOffset={4}>
                        <FormControl type="email" placeholder="Email" />
                    </Col>
                </FormGroup>
                <FormGroup controlId="signupHorizontalPassword">
                    <Col sm={4} smOffset={4}>
                        <FormControl type="password" placeholder="Password" />
                    </Col>
                </FormGroup>
                <FormGroup controlId="signupHorizontalConfirmPassword">
                    <Col sm={4} smOffset={4}>
                        <FormControl type="password" placeholder="Confirm Password" />
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