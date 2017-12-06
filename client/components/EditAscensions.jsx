import React from 'react';
import axios from 'axios';

export default class EditAscensions extends React.Component {

    constructor() {
        super()
        this.state = {
            costs: [],
            servants: [],
            items: [],
            costId: 0,
            servant: null
        }
        this.handleServantChange = this.handleServantChange.bind(this);
        this.addCost = this.addCost.bind(this);
    }

    componentWillMount() {
        const obj = {};
        axios.get('http://localhost:1337/servant/all/basic')
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

    handleServantChange(event) {
        this.setState({servant: event.target.value});
    }

    addCost() {
        const cost = {};
        cost.id = this.state.costId;
        cost.ascLvl = null;
        cost.itemId = null;
        cost.quantity = null;
        const newCosts = this.state.costs.concat(cost);
        this.setState({costs: newCosts, costId: cost.id + 1});
    }

    render() {
        
        const servants = this.state.servants;
        const items = this.state.items;
        const costs = this.state.costs;
        
        return (
            <div>
                <h2>Edit Servant Ascensions</h2>
                <div>
                    <select onChange={this.handleServantChange}>
                        {
                            servants && servants.length ?
                            servants.map(servant => <option value={servant.id} key={servant.id}>{servant.name}</option>)
                            : <option></option>
                        }
                    </select>
                </div>
                <div>
                    <button onClick={this.addCost}>Add Cost</button>
                </div>
                <div className="ascension-form">
                <div className="costs-description">
                    <p>Ascension Level</p>
                    <p>Item</p>
                    <p>Quantity</p>
                </div>
                {
                    costs.length ?
                    costs.map(cost => {
                        return (
                            <div key={cost.id} className="costs-form">
                                <select style={{width: "5em"}}>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={3}>4</option>
                                </select>
                                <select>
                                {
                                    items && items.length ?
                                    items.map(item => <option key={item.id} value={item.id}>{item.name}</option>)
                                    : null
                                }
                                </select>
                                <input type="text"></input>
                            </div>
                        );
                    })
                    : null
                }
                </div>
            </div>
        )
    }
}