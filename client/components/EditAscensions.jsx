import React from 'react';
import axios from 'axios';

export default class EditAscensions extends React.Component {

    constructor() {
        super()
        this.state = {
            costs: [],
            servants: [],
            items: [],
            costId: 0
        }
    }

    componentWillMount() {
        //axios.post('http://localhost:1337/servant/cost');
        const obj = {};
        axios.get('http://localhost:1337/servant')
        .then(res => res.data)
        .then(servants => {
            obj.servants = servants;
            return;
        })
        .then(() => axios.get('http://localhost:1337/item'))
        .then(res => res.data)
        .then(items => {
            obj.items = items;
            this.setState(obj);
        });
    }

    render() {
        console.log(this.state);
        return (
            <div>
                <h2>Edit Servant Ascensions</h2>
                
            </div>
        )
    }
}