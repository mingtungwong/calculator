import React from 'react';
import axios from 'axios';

export default class ServantList extends React.Component {

    constructor() {
        super();
        this.state = {
            servants: []
        }
    }

    componentWillMount() {
        axios.get('http://localhost:1337/servant')
        .then(res => res.data)
        .then(servants => this.setState({servants}));
    }

    render() {
        return (
            <div>
                {
                    !this.state.servants.length ?
                    <p>
                        Loading
                    </p>
                    :
                    <div>
                        {
                            this.state.servants.map(servant => {
                                return (
                                    <div key={servant.id}>
                                        <span>{servant.name}</span><span>{servant.class}</span><span>{servant.stars}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                }
            </div>
        )
    }
}