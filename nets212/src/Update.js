import React, {useState} from 'react';
import DatePicker from 'react-date-picker';
import {Redirect} from 'react-router-dom';
import $ from 'jquery'
var Config = require("./Config.js");

function Update(props) {
    const [state , setState] = useState({
        email : "",
        password : "",
        confirmpassword : "",
        birthday : "",
        affiliation: "",
        news: ""
    })
    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }


    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const handleSubmitEmail = (e) => {
        e.preventDefault();
        if (state.email === "") {
            setState({
                errorEmail: "Email cannot be empty!",
                successEmail : ""
            })
        } else if (!re.test(state.email.toLowerCase())) {
            setState({
                errorEmail : "Email of wrong format!",
                successEmail : ""
            }) 
        } else {
            setState({
                errorEmail : "",
                successEmail : "successfuly changed email"
            })
            let update = {
                id: localStorage.getItem('user'),
                email: state.email
            }
            let request1 = $.post(Config.serverUrl + '/user/update', update);
            request1.done((result) => {
            });
        }
    }

    const handleSubmitPassword = (e) => {
        e.preventDefault();
        if (state.password === "" || state.confirmpassword === "") {
            setState({
                errorPassword: "password fields cannot be empty!",
                successPassword : ""
            })
        } else if (state.password !==  state.confirmpassword) {
            setState({
                errorPassword : "passwords DO NOT MATCH",
                successPassword : ""
            }) 
        } else {
            setState({
                errorPassword : "",
                successPassword : "successfuly changed password "
            })
            let update = {
                id: localStorage.getItem('user'),
                password: state.password
            }
            let request1 = $.post(Config.serverUrl + '/user/update', update);
            request1.done((result) => {
            });
            ///NEED post request to the backend to change password
        }
    }

    const handleSubmitAffiliation = (e) => {
        if (state.affiliation === "") {
            setState({
                errorAffiliation: "field cannot be empty!",
                successAffiliation : ""
            })
        } else {
            setState({
                errorAffiliation: "",
                successAffiliation : "Successfuly Changed Affiliation"
            })
        } 
        //write route to backend later
        // need to trigger a post. 
    }

    const handleSubmitInterest = (e) => {
        if (state.news === "") {
            setState({
                errorInterest: "field cannot be empty!",
                successInterest : ""
            })
        } else {
            setState({
                errorInterest: "",
                successInterest : "Successfuly Changed Interest"
            })
        }
        //write route to backend later
        // need to trigger a post. 
    }

    //Check if user is logged in
    if(false) {
        return <Redirect to='/'/>
    }

    return(
            <div className="card col-12 col-lg-5 login-card mt-4 hv-center p-3 mb-4">
                <h1> Update your account</h1>
                <br></br>

                <h5>Change Email?</h5>
                <input type="email" 
                        className="form-control mt-2" 
                        id="email" 
                        placeholder="Enter new Email"
                        value={state.email}
                        onChange={handleChange} 
                    />
                <button 
                    type="submit" 
                    className="btn btn-primary mt-3"
                    onClick={handleSubmitEmail}
                    id="email"
                    >
                Change Email
                </button>   
                <p class = "text-danger">
                    {state.errorEmail}
                 </p>
                 <p class = "text-success">
                    {state.successEmail}
                 </p>
                <br></br>
                <h5>Change Password?</h5>
                <input type="password" 
                        className="form-control mt-2" 
                        id="password" 
                        placeholder="Enter new Password"
                        value={state.password}
                        onChange={handleChange} 
                    />
                <input type="password" 
                        className="form-control mt-2" 
                        id="confirmpassword" 
                        placeholder="ConfirmPassword"
                        value={state.confirmpassword}
                        onChange={handleChange} 
                    />

                <button 
                    type="submit" 
                    className="btn btn-primary mt-3"
                    onClick={handleSubmitPassword}
                    id="password"
                    >
                Change Password
                </button>  
                <p class = "text-danger">
                    {state.errorPassword}
                 </p>
                 <p class = "text-success">
                    {state.successPassword}
                 </p>
                <br></br>

                <h5>Change Affiliation?</h5>
                <input type="email" 
                        className="form-control mt-2" 
                        id="affiliation" 
                        placeholder="Enter new Affiliation"
                        value={state.affiliation}
                        onChange={handleChange} 
                    />
                <button 
                    type="submit" 
                    className="btn btn-primary mt-3"
                    onClick={handleSubmitAffiliation}
                    id="Affiliation"
                    >
                    Change Affiliation
                </button>  
                <br></br>

                <p class = "text-danger">
                    {state.errorAffiliation}
                 </p>
                 <p class = "text-success">
                    {state.successAffiliation}
                 </p>

                <br></br>
                <h5>Add an interest in news</h5>
                <input type="email" 
                        className="form-control mt-2" 
                        id="news" 
                        placeholder="Enter new Interest"
                        value={state.news}
                        onChange={handleChange} 
                    />

                <button 
                    type="submit" 
                    className="btn btn-primary mt-3"
                    onClick={handleSubmitInterest}
                    id="news"
                    >
                    Add a news Interest!
                </button>  
                <p class = "text-danger">
                    {state.errorInterest}
                 </p>
                 <p class = "text-success">
                    {state.successInterest}
                 </p>

            </div>

        )
    }
export default Update;