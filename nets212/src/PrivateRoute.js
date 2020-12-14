import React from 'react';
import {Redirect, Route} from 'react-router-dom';

function PrivateRoute(props) {
    
    return (localStorage.getItem('user') == undefined ? <Redirect to='/'/> : <Route path={props.path} component={props.component} exact={props.exact}/>);
}

export default PrivateRoute;