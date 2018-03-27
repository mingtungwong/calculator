import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import config from '../../config.json';

class AddClass extends React.Component {
    constructor() {
        super();
        this.state = {
            className: ""
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
        this.setState({ className: event.target.value });
    }

    onSubmit() {
        axios.post(`${config.server}/api/data/add/class`, this.state)
            .then(() => this.props.history.push(`/servants`));
    }

    render() {
        console.log(this.props.user);
        return (
            <div>
                <h2>Add Class</h2>
                <label htmlFor="add_class_input">Class:</label>
                <input type="text" id="add_class_input" onChange={this.onChange} />
                <button onClick={this.onSubmit}>Submit</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.users
    }
}

export default connect(mapStateToProps)(AddClass);