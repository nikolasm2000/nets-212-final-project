import React, {useState} from 'react'
import $ from 'jquery'; 
import { useHistory } from "react-router-dom";

var config = require('./Config');


function LoginForm(props) {
    var history = useHistory();

    const [state , setState] = useState({
        email : "",
        password : "",
    })

    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const handleSubmit = (e) => {
        if (state.password === "") {
            setState(prevState => ({
                ...prevState,
                error : "Password can't be empty!"
            }))
        }  else if (state.email === "") {
            setState(prevState => ({
                ...prevState,
                error : "Email can't be empty!"
            }))
        } else if (!re.test(state.email.toLowerCase())) {
            setState(prevState => ({
                ...prevState,
                error : "Email of wrong format!"
            }))
        } else {


            //Make call here
            var request = $.post({
                url: config.serverUrl + "/login", 
                data: {
                    email: state.email,
                    password: state.password
                    },
                xhrFields: {withCredentials: true}
            });
    
            //SUCCESS
            request.done((result) => {
                setState(prevState => ({
                    ...prevState,
                    error: ""
                }))
                localStorage.setItem('user', result.id);
                console.log("CHECK HERE" + localStorage.getItem('user'));
                history.push("/home");
            })

            request.fail((error) => {
                setState(prevState => ({
                    ...prevState,
                    error : "Invalid email/password"
                }))
            });
        }

        
    }


    return (
        <div className="card col-12 col-lg-3 login-card mt-2 hv-center p-4">
            <h1> Welcome to PennBooks</h1>
            Email:
            <input type="email" 
                       className="form-control mb-2" 
                       id="email" 
                       placeholder="Enter email" 
                       value={state.email}
                       onChange={handleChange}
                />
            Password:
            <input type="password" 
                        className="form-control" 
                        id="password" 
                        placeholder="Password"
                        value={state.password}
                        onChange={handleChange} 
                    />
        <button 
                    type="submit" 
                    className="btn btn-primary mt-4 mb-2"
                    onClick={handleSubmit}
          >
                    Log in
          </button>
          Not a user? <a href = '/register'> Register Here. </a>
          <p class = "text-danger">
            {state.error}
          </p>
        </div>
    )
}

export default LoginForm;