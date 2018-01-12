import React from 'react';
import axios from 'axios';
import ServantProfile from './ServantProfile.jsx';
import { Route, Link } from 'react-router-dom';
import { pad } from '../../utils/';
import config from '../../config.json';

export default class ServantList extends React.Component {

    constructor() {
        super();
        this.state = {
            allServants: [],
            servants: [],
            classes: [],
            sortBy: "id",
            order: "asc",
            classFilter: "any",
            starFilter: "any",
            textFilter: ""
        }
        this.onChange = this.onChange.bind(this);
        this.filter = this.filter.bind(this);
        this.reset = this.reset.bind(this);
    }

    componentWillMount() {
        axios.get(`${config.server}/servant`)
        .then(res => res.data)
        .then(servants => {
            let classes = this.getClassesFromServants(servants);
            this.setState({allServants: servants, servants, classes});
        });
    }
    
    getClassesFromServants(servants) {
        return Array.from(new Set(servants.map(servant => servant.class)));
    }

    getClassImageLocation(servantClass) {
        return `/public/assets/classes/${servantClass.toLowerCase()}.png`;
    }

    onChange(event) {
        const obj = {};
        const { value, id } = event.target;
        switch(id) {
            case 'servant_list_sort_criteria': obj.sortBy = value; break;
            case 'servant_list_sort_order': obj.order = value; break;
            case 'servant_class_filter': obj.classFilter = value; break;
            case 'servant_star_filter': obj.starFilter = value; break;
        }
        this.setState(obj);
    }

    reset() {
        this.setState({sortBy: "id", order: "asc", classFilter: "any", starFilter: "any", textFilter: ""}, this.filter);
    }

    filter(event=null, text = this.state.textFilter) {
        const { classFilter, starFilter, sortBy, order } = this.state;

        const servants = this.state.allServants
                            .map(servant => servant)
                            .filter(servant => {
                                if(classFilter === "any" && starFilter === "any") return true;
                                else if(classFilter !== "any" && starFilter !== "any") return servant.class === classFilter && servant.stars == starFilter;
                                else if(classFilter === "any") return servant.stars == starFilter;
                                else return servant.class === classFilter;
                            })
                            .filter(servant => servant.name.toLowerCase().includes(text) || servant.class.toLowerCase().includes(text))
                            .sort((a, b) => {
                                let sortValue = 0;
                                if(sortBy === "id") sortValue = a.id - b.id;
                                else if(sortBy === "name") sortValue = a.name < b.name ? -1 : 1;
                                else sortValue = a.stars - b.stars;
                                if(order === "desc") sortValue *= -1;
                                return sortValue;
                            });
        this.setState({servants, textFilter: text});
    }

    render() {
        return (
            <div>
                {
                    !this.state.allServants.length ?
                    <p>
                        Loading
                    </p>
                    :
                    <div>
                        <h3>Servant List</h3>
                        <div>
                            <label htmlFor="servant_text_filter">Text Filter:</label>
                            <input type="text" id="servant_text_filter" className="text-filter" value={this.state.textFilter} onChange={(event) => this.filter(null, event.target.value.toLowerCase())}/>
                        </div>
                        <div>
                            <label htmlFor="servant_list_sort_criteria">Sort By:</label>
                            <select id="servant_list_sort_criteria" onChange={this.onChange} value={this.state.sortBy}>
                                <option value="id">ID</option>
                                <option value="name">Name</option>
                                <option value="stars">Stars</option>
                            </select>
                            <label htmlFor="servant_list_sort_order">Order:</label>
                            <select id="servant_list_sort_order" onChange={this.onChange} value={this.state.order}>
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="servant_class_filter">Class:</label>
                            <select id="servant_class_filter" onChange={this.onChange} value={this.state.classFilter}>
                                <option value="any">Any</option>
                                {
                                    this.state.classes.map(servantClass => <option value={servantClass} key={servantClass}>{servantClass}</option>)
                                }
                            </select>
                            <label htmlFor="servant_star_filter" onChange={this.onChange}>Stars</label>
                            <select id="servant_star_filter" onChange={this.onChange} value={this.state.starFilter}>
                                <option value="any">Any</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                        <div className="servant-list-buttons">
                            <button onClick={this.filter}>Apply</button>
                            <button onClick={this.reset}>Reset</button>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th className="td-id">ID</th>
                                    <th className="td-servant-img">Image</th>
                                    <th className="td-servant-name">Name</th>
                                    <th className="td-class-logo">Class</th>
                                    <th className="td-stars">Rarity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.servants.map(servant => {
                                        return (
                                            <tr key={servant.id}>
                                                <td className="td-id">{servant.id}</td>
                                                <td className="td-servant-img"><Link to={`/servant/${servant.id}`}><img className="servant-img" src={`public/assets/servants/${pad(servant.id)}.png`}/></Link></td>
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