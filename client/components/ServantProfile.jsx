import React from 'react';
import axios from 'axios';

export default class ServantProfile extends React.Component {

    constructor() {
        super();
        this.state = {
            servant: null
        };
    }

    componentWillMount() {
        axios.get(`http://localhost:1337/servant/cost/${this.props.match.params.id}`)
        .then(res => res.data)
        .then(servantObj => {
            this.setState({servant: servantObj});
        });
    }

    render() {

        const servant = this.state.servant;
        console.log(this.state);
        return (
            <div>
                {
                    this.state.servant ?
                    <div>
                        <div><h2>{servant.profile.name}</h2></div>
                        <div>
                        {
                            new Array(servant.profile.stars)
                                .fill(0)
                                .map((x, idx) => <span key={idx} className="glyphicon glyphicon-star"></span>)
                        }
                        </div>
                        <div className="servant-portrait">
                            <img src={`/public/assets/servants/${'000'.slice(servant.profile.id.toString().length) + servant.profile.id}.png`} />
                        </div>
                        <div>
                            <table>
                                <thead>
                                    <tr>
                                        <th className="t-asc-lvl">Ascension Level</th>
                                        <th className="t-mat">1</th>
                                        <th className="t-mat">2</th>
                                        <th className="t-mat">3</th>
                                        <th className="t-qp">4</th>
                                        <th>QP</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        
                                        servant.costs.map((level, idx) => {
                                            return (
                                                level ? 
                                                <tr key={idx + 1}>
                                                    <td>{idx + 1}</td>
                                                    {
                                                        level.map((item, index) => {
                                                            return (
                                                                item ?
                                                                item !== ' ' ?
                                                                <td key={index} className="mat-rows">
                                                                    <img height="64px" width="64px" src={`/public/assets/items/${'000'.slice(item.id.toString().length) + item.id}.png`}/>
                                                                    <p className="mat-quantity">{`x${item.quantity}`}</p>
                                                                </td>
                                                                : <td key={index} className="mat-rows"></td>
                                                                : null
                                                            );
                                                        })
                                                    }
                                                    <td>{(+servant.qp[idx].qp_cost).toLocaleString('en')}</td>
                                                </tr>
                                                : null
                                            )
                                        })
                                    }
                                </tbody>
                            </table>  
                        </div>
                    </div>
                    : null
                }
            </div>
        )
    }

}