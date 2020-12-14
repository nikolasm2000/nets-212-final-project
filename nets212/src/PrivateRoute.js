import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import $ from 'jquery';

var config = require('./Config.js')

function PrivateRoute(props) {
    
    return (localStorage.getItem('user') ? <Route path={props.path} component={props.component} exact={props.exact}/> : <Redirect to='/'/>);
}

export default PrivateRoute;