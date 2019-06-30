import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import back_icon from '../../../../resources/back_icon.png';

const BackButton = ({route}) => {

    return (
        <Link to={route} style={{color: "white", display: 'flex'}}>
            <img style={{blockSize: "44px"}} src={back_icon}/>
            <span style={{alignSelf: "center"}}>Back</span>
        </Link>
    );

}

BackButton.propTypes = {
    route: PropTypes.string.isRequired
}


export default BackButton;