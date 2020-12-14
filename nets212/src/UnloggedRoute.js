import React from 'react';
import {Redirect, Route} from 'react-router-dom';

function UnloggedRoute(props) {
    
    return (localStorage.getItem('user') != undefined ? <Redirect to='/home'/> : <Route path={props.path} component={props.component} exact={props.exact}/>);
}

export default UnloggedRoute;