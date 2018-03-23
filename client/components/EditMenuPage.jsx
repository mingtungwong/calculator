import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import EditMenu from './EditMenu.jsx';

class EditMenuPage extends React.Component {
    render() {
        const { user } = this.props;
        return (
                user.admin
                ? <EditMenu />
                : _.isEmpty(user)
                ? <div>Please log in!</div>
                : <div>Unauthorized</div> 
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.users
    }
}

export default connect(mapStateToProps)(EditMenuPage);