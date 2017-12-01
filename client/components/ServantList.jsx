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

    pad(num) {
        return '000'.slice(num.toString().length) + num;
    }

    getClassImageLocation(servantClass) {
        return `/public/assets/classes/${servantClass.toLowerCase()}.png`;
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
                                        <img src={`public/assets/servants/${this.pad(servant.id)}.png`}/>
                                        <span>{servant.name}</span><img src={this.getClassImageLocation(servant.class)}/>
                                        <span className="glyphicon glyphicon-star"></span>
                                        <span>{new Array(servant.stars - 1).fill(0).map((x, idx) => {
                                            return (
                                                <span key={idx} className="glyphicon glyphicon-star"></span>
                                            )
                                        })}</span>
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