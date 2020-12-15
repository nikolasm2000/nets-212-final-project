import React, {useState} from 'react'
import DatePicker from 'react-date-picker' 
import $ from 'jquery'; 
import moment from 'moment';
import { useHistory } from "react-router-dom";
import {Redirect} from 'react-router-dom'

var config = require("./Config.js")

function RegistrationForm(props) {
    const history = useHistory();

    const [state , setState] = useState({
        email : "",
        password : "",
        confirmpassword : "",
        first : "",
        last : "",
        affiliation: "",
        interests: "",
        birthday: ""
    })
    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }
    const handleChange2 = (date) => {
        console.log(date);
        setState(prevState => ({
            ...prevState,
            birthday: date
        }))
    }

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (state.email === "") {
            setState({
                error: "Email cannot be empty!"
            })
        } else if (!re.test(state.email)) {
            setState({
                error : "Email of wrong format!"
            })
        } else if (state.password === "" || state.confirmpassword === "") {
            setState({
                error : "Passwords cannot be empty!"
            })
        } else if (state.password !== state.confirmpassword) {
            setState({
                error : "Passwords do NOT match!!"
            })
        } else if (state.first === "" || state.last === "") {
            setState({
                error : "Please your Name. Numbers only if Elon Musk"
            })
        } 
        else if (state.affiliation === "") {
            setState({
                error : "Please add an Affiliation."
            })
        } else if (state.interests === "") {
            setState({
                error : "Please add an Interest."
            })
        } else if (state.birthday == undefined) {
            setState({
                error : "Come on add your birthday!"
            })
        } else {
            state.birthday = moment(state.birthday).unix();
            let newUser = {
                email: state.email,
                password: state.password,
                first_name: state.first,
                last_name: state.last,
                birthday: state.birthday
    
            };
            
            var request = $.post(config.serverUrl + "/user/create", newUser);
            alert("hello")
            request.done((result) => {
                setState({
                    error : ""
                });
                localStorage.setItem('user', result.id);
                history.push("/home");
            }) 
            request.fail((err) => {
                setState({
                    error : "Email already in use!"
                });
            });
        }
    }

    if(false) {
        return <Redirect to='/'/>
    }

    return(
    <div className="card col-12 col-lg-5 login-card mt-4 hv-center p-4">
        <h1> Register for PennBooks Here:</h1>
    Email:
      <input type="email" 
                       className="form-control" 
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

    Confirm Password:
      <input type="password" 
                        className="form-control" 
                        id="confirmpassword" 
                        placeholder="Retype your password"
                        value={state.confirmpassword}
                        onChange={handleChange} 
                    />
    First Name: 
      <input type="first" 
                        className="form-control" 
                        id="first" 
                        placeholder="First Name"
                        value={state.first}
                        onChange={handleChange} 
                    />
    Last Name: 
      <input type="last" 
                        className="form-control" 
                        id="last" 
                        placeholder="Last Name"
                        value={state.last}
                        onChange={handleChange} 
                    />
    Affiliation:
      <input type="affiliation" 
                        className="form-control" 
                        id="affiliation" 
                        placeholder="Affiliation to PennBooks. 1 for the time being :) "
                        value={state.affiliation}
                        onChange={handleChange} 
                    />

    Interest:
      <input type="interests" 
                        className="form-control" 
                        id="interests" 
                        placeholder="What are you interested in? 1 for the time being :)"
                        value={state.interests}
                        onChange={handleChange} 
                    />

      Birthday: 
      <DatePicker 
                    onChange={handleChange2} 
                    selected={state.birthday}
                    value={state.birthday}
                    maxDate={new Date("2020, 12, 17")}
                    dateFormat="MM/dd/yyyy"
                />

        <button 
                    type="submit" 
                    className="btn btn-primary mt-4 mb-2"
                    onClick={handleSubmit}
          >
                    Register
          </button>

          Already a User? <a href="/"> Login Here. </a>
          <p class = "text-danger">
            {state.error}
          </p>
      </div>
    )
}

export default RegistrationForm;