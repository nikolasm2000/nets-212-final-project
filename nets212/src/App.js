import React, {useState} from 'react';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import Update from './Update';
import HomePage from './HomePage';
import Messagetable from './Messagetable';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import UserPage from './UserPage';
import GraphVisualizer from './GraphVisualizer';
import PrivateRoute from './PrivateRoute';
import UnloggedRoute from './UnloggedRoute';
import $ from 'jquery'


function App() {  
//   $.ajaxSetup({
//     xhrFields: {
//        withCredentials: true
//     },
// });
return (
    <Router>
    <div className="App">
        <div className="container-fluid p-0 d-flex align-items-center flex-column m-0">
          <Switch>
            <UnloggedRoute path = "/" exact = {true} component={LoginForm}/>
            <UnloggedRoute path="/register" exact={true} component={RegistrationForm}/>
            <PrivateRoute path="/user/:id" exact={true} component={UserPage}/>
            <PrivateRoute path = "/home" exact={true} component={HomePage}/>
            <PrivateRoute path = "/update" exact={true} component={Update}/>
            <PrivateRoute path = '/messages' exact={true} component={Messagetable}/>
            <PrivateRoute path = '/graph' exact={true} component={GraphVisualizer}/>
          </Switch>
       </div>
   </div>
  </Router>
  )  
}
export default App;