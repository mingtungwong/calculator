import React from 'react';
import axios from 'axios';
import ServantProfile from './ServantProfile.jsx';
import { Route, Link } from 'react-router-dom';

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
                        <h3>Servant List</h3>
                        <table>
                            <tbody>
                                {
                                    this.state.servants.map(servant => {
                                        return (
                                            <tr key={servant.id}>
                                                <td className="td-id">{servant.id}</td>
                                                <td className="td-servant-img"><Link to={`/servant/${servant.id}`}><img className="servant-img" src={`public/assets/servants/${this.pad(servant.id)}.png`}/></Link></td>
                                                <td className="td-servant-name"><Link to={`/servant/${servant.id}`}>{servant.name}</Link></td>
                                                <td className="td-class-logo"><img className="class-logo" src={this.getClassImageLocation(servant.class)}/></td>
                                                <td className="td-stars">{new Array(servant.stars).fill(0).map((x, idx) => {
                                                    return (
                                                        <span key={idx} className="glyphicon glyphicon-star"></span>
                                                    )
                                                })}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        )
    }
}