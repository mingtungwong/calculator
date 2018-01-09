import React from 'react';
import axios from 'axios';

export default class AddServant extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <h2>Add Servant</h2>
                <form>
                    <label forhtml="add_servant_servant_name">Servant Name</label>
                    <input type="text" id="add_servant_servant_name" />
                </form>
            </div>
        )
    }
}