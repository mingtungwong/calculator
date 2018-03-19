import React from 'react';
import axios from 'axios';
import config from '../../config.json';

export default class AddClass extends React.Component {
    constructor() {
        super();
        this.state = {
            className: ""
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
        this.setState({className: event.target.value});
    }

    onSubmit() {
        axios.post(`${config.server}/api/data/add/class`, this.state)
        .then(() => this.props.history.push(`/servants`));
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