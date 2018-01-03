import React from 'react';
import axios from 'axios';
import config from '../../config.json';

import ServantTotalMaterialTable from './ServantTotalMaterialTable.jsx';

export default class ServantProfile extends React.Component {

    constructor() {
        super();
        this.state = {
            servant: null,
            totalCosts: {},
            qpTotal: 0
        };
    }

    componentWillMount() {
        axios.get(`${config.server}/servant/cost/${this.props.match.params.id}`)
        .then(res => res.data)
        .then(servantObj => {
            let total = {};
            let costs = servantObj.costs;
            for(let ascLvl of costs) {
                for(let cost of ascLvl) {
                    if(cost !== ' ') {
                        if(!total[cost.id]) total[cost.id] = 0;
                        total[cost.id] += cost.quantity;
                    }
                }
            }
            this.setState({servant: servantObj, totalCosts: total, qpTotal: servantObj.qp.reduce((total, obj) => total + +obj["qp_cost"], 0)});
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
                <div>
                    <h3>Total Material Cost</h3>
                    {
                        Object.keys(this.state.totalCosts).length ?
                        (
                            <ServantTotalMaterialTable materials={this.state.totalCosts} qp={this.state.qpTotal.toLocaleString('en')}/>
                        )
                        : null 
                    }
                </div>
            </div>
        )
    }

}