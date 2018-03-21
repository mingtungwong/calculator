import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import EditMenu from './EditMenu.jsx';

class EditMenuPage extends React.Component {
    render() {
        const { user } = this.props;
        return (
                !_.isEmpty(user) && user.admin
                ? <EditMenu />
                : <div>Please Log In!</div> 
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.users
    }
}

export default connect(mapStateToProps)(EditMenuPage);