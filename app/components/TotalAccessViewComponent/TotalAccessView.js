import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes.json';
import { containerStyle } from '../../constants/constantStyles';
import PropTypes from 'prop-types'
import AccessTableView from './AccessTableViewComponents/AccessTableView';
import BackButton from '../ReusableComponent/BackButtonComponent/BackButton';

const TotalAccessView = (match) => {

    return <div className="container-flex" style={containerStyle}>
        <div className="row">
            <div className="d-inline-flex">
                <BackButton route={routes.HOME} />
            </div>
            <div className="col-sm-12 text-center">
                <h3>
                    <b>
                        {match.match.params.user_id}
                    </b> access
                </h3>
            </div>
            <div className="col-sm-12">
                <AccessTableView user_id={match.match.params.user_id}/>
            </div>
        </div>
    </div>

}

TotalAccessView.propTypes = {
    match: PropTypes.object.isRequired
}

export default TotalAccessView;