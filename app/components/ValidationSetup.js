// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Counter.css';
import routes from '../constants/routes';


const ValidationSetup = () => {

  return (

    <div>
      <Link to={routes.Home}>Home</Link>
    </div>
    
  )

}
