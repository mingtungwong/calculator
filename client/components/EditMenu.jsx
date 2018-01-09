import React from 'react';
import { Link } from 'react-router-dom';

export const EditMenu = () => (
    <div>
        <h2>Edit Menu</h2>
        <p>Choose a category to add or edit.</p>
        <div id="edit-menu-options">
            <Link to="/edit/add/servant">Add Servant</Link>
            <Link to="/edit/add/ascensions">Add Ascensions</Link>
        </div>
    </div>
)

export default EditMenu;

