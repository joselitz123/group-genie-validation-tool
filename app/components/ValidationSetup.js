// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Counter.css';
import routes from '../constants/routes';


const ValidationSetup = () => {

  return (

    <div>
      <Link to={routes.HOME}>Homes</Link>
    </div>
    
  )

}


export default ValidationSetup;