import React from 'react';
import axios from 'axios';
import config from '../../config.json';
import ErrorMessage from './ErrorMessage.jsx';

export default class AddServant extends React.Component {
    constructor() {
        super();
        this.state = {
            servantClasses: [],
            name: "",
            classID: 1,
            stars: 1,
            id: null,
            nameError: false,
            idError: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        axios.get(`${config.server}/data/classes`)
        .then(res => res.data)
        .then(servantClasses => this.setState({servantClasses}));
    }

    handleSubmit(event) {
        const { name, classID, stars, id } = this.state;
        if(name.length > 0 && !isNaN(id) && id > 0) {
            console.log("No errors");
        } else {
            const errorObj = {};
            errorObj.nameError = name.length === 0;
            errorObj.idError = isNaN(id) || id <= 0;
            this.setState(errorObj);
        }
    }

    handleChange(event) {
        const obj = {};
        const { value, id } = event.target;
        switch(id.substring(12)) {
            case 'servant_name': obj.name = value; break;
            case 'servant_id': obj.id = +value; break;
            case 'servant_class': obj.classID = +value; break;
            case 'servant_stars': obj.stars = +value; break;
        }
        this.setState(obj);
    }

    render() {
        console.log(this.state.servantClasses);
        return (
            <div id="add-servant-form">
                <h2>Add Servant</h2>
                <div>
                    {
                        this.state.nameError ?
                        <ErrorMessage message={`The name cannot be empty`} />
                        : null
                    }
                    {
                        this.state.idError ?
                        <ErrorMessage message={`The ID must be a valid numerical value that is greater than 0`} />
                        : null
                    }
                    <form id="add_servant" onChange={this.handleChange}>
                        <div>
                            <label forhtml="add_servant_servant_name">Servant Name:</label>
                            <input type="text" id="add_servant_servant_name" />
                        </div>
                        <div>
                            <label forhtml="add_servant_servant_class">Class:</label>
                            <select id="add_servant_servant_class">
                            {
                                this.state.servantClasses.map(servantClass => {
                                    return (
                                        <option key={servantClass.id} value={servantClass.id}>{servantClass.name}</option>
                                    )
                                })
                            }
                            </select>
                        </div>
                        <div>
                            <label forhtml="add_servant_servant_stars">Stars:</label>
                            <select id="add_servant_servant_stars">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                        <div>
                            <label>Servant ID:</label>
                            <input type="text" id="add_servant_servant_id" size="2"/>
                        </div>
                    </form>
                    <button onClick={this.handleSubmit}>Submit</button>
                </div>
            </div>
        )
    }
}