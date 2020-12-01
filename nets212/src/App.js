import React, {useState} from 'react';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import Newsfeed from './Newsfeed';
import Update from './Update';
import HomePage from './HomePage';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import UserPage from './UserPage';
function App() {

  const posts = [{text:"Hey guys this is a post lol", user:{firstName:"Henrique", lastName:"Lorente", userURL:"id=?2131"} }, 
                 {text: "Male stripper looking for gigs. Police uniform $10 extra, happy endings $30 extra.", user:{firstName:"Pranav", lastName:"Aurora", userURL:"/id=2312"}, imageURL:"https://scontent.ffxe1-1.fna.fbcdn.net/v/t1.0-9/55817175_1278692865621197_1432642661486952448_n.jpg?_nc_cat=109&ccb=2&_nc_sid=a4a2d7&_nc_ohc=5yGvxbSXra8AX-nMbDB&_nc_ht=scontent.ffxe1-1.fna&oh=1e14b237408342c652ac4f440691df0e&oe=5FE99984"}];
return (
    <Router>
    <div className="App">
        <div className="container-fluid p-0 d-flex align-items-center flex-column">
          <Switch>
            <Route path = "/" exact = {true}>
              <LoginForm/>
            </Route>
            <Route path="/register" exact={true}>
              <RegistrationForm />
            </Route>
            <Route path="/user/0" exact={true}>
              <UserPage />
            </Route>
            <Route path = "/home" exact={true}>
              <HomePage posts={posts}/>
            </Route>
            <Route path = "/update" exact={true}>
              <Update/>
            </Route>
          </Switch>
       </div>
   </div>
  </Router>
  )  
}
export default App;