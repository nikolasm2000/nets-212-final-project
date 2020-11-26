import React, {useState} from 'react';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
function App() {
return (
    <Router>
    <div className="App">
        <div className="container d-flex align-items-center flex-column">
          <Switch>
            <Route path = "/" exact = {true}>
              <LoginForm/>
            </Route>
            <Route path="/register" exact={true}>
              <RegistrationForm />
            </Route>
          </Switch>
       </div>
   </div>
  </Router>
  )  
}
export default App;