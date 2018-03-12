import React from 'react';
import axios from 'axios';

export default class AddClass extends React.Component {
    constructor() {
        super();
        this.state = {
            class: ""
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
        this.setState({class: event.target.value});
    }

    onSubmit() {
        console.log(this.state.class);
    }

    render() {
        return (
            <div>
                <h2>Add Class</h2>
                <label htmlFor="add_class_input">Class:</label>
                <input type="text" id="add_class_input" onChange={this.onChange}/>
                <button onClick={this.onSubmit}>Submit</button>
            </div>
        )
    }
}