import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const ValidationResultSection = ({valResult}) => {

    const arrValResult = Object.values(valResult);

    return (
        <Fragment>
            <h4>Users Validated:</h4>
            <div>
                {arrValResult.length != 0 ? 
                    <ol>
                        {arrValResult.map((result, index) => {
                            return (
                                <li key={index}>
                                    {result.user}
                                    <ul>
                                        {Object.values(result.access).map(((access, key) => {
                                            return <li key={key}>{access.val_result ? <span dangerouslySetInnerHTML={{ __html: '&#9989;'}}></span> : <span dangerouslySetInnerHTML={{ __html: '&#x274C;'}}></span>} {access.group_alias}</li>
                                        }))}
                                    </ul>
                                </li>
                                )
                        })}
                    </ol> : 
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