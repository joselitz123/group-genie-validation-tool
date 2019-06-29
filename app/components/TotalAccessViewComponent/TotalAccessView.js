import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes.json';
import { containerStyle } from '../../constants/constantStyles';
import PropTypes from 'prop-types'
import AccessTableView from './AccessTableViewComponents/AccessTableView';

const TotalAccessView = (match) => {

    return <div className="container-flex" style={containerStyle}>
        <div className="row">
            <div className="col-sm-12">
                <Link to={routes.HOME}>Go Home</Link>
                <h3>{match.match.params.user_id} access:</h3>
                <AccessTableView />
            </div>
        </div>
    </div>

}

TotalAccessView.propTypes = {
    match: PropTypes.object.isRequired
}

export default TotalAccessView;