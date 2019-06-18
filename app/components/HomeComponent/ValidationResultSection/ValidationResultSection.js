import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ResultDataTable from './ResultDataTable';

const ValidationResultSection = ({valResult}) => {

    const arrValResult = Object.values(valResult);

    return (
        <Fragment>
            <h4>Users Validated:</h4>
            <div>
                {arrValResult.length != 0 ? 
                    <ResultDataTable /> :
                ""}                
            </div>
        </Fragment>
    )
}

ValidationResultSection.propTypes = {
    valResult: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    valResult: state.validationReducer.validationResult
});

export default connect(mapStateToProps, null)(ValidationResultSection);