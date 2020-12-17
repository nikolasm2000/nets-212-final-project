import React, {useState} from 'react'
import DatePicker from 'react-date-picker' 
import $ from 'jquery'; 
import moment from 'moment';
import { useHistory } from "react-router-dom";
import {Redirect} from 'react-router-dom'
import Select from 'react-select';

import './searcherstyle.css';

var config = require("./Config.js")

class RegistrationForm extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            email : "",
            password : "",
            confirmpassword : "",
            first : "",
            last : "",
            affiliation: undefined,
            interests: [],
            birthday: undefined,
            optionsAffiliation: [],
            optionsInterest: [],
            redirect: undefined
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleInterest = this.handleInterest.bind(this);
        this.handleAffiliation = this.handleAffiliation.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        var request = $.post(config.serverUrl + "/affiliations/getAll");
        request.done((result) => {
            var toR = []
            result.forEach(entry => {
                let obj = {value: entry, label: entry}
                toR.push(obj)
            })
            this.setState({optionsAffiliation: toR})
        }
            );
        var request1 = $.post(config.serverUrl + "/interests/getAll");
        request1.done((result) => {
            var toC = []
            result.forEach(entry => {
                let obj = {value: entry, label: entry}
                toC.push(obj)
            })
            this.setState({optionsInterest: toC})
        });
    }
    

    handleChange(e) {
        const {id , value} = e.target   
        this.setState({
            [id] : value
        });
    }
    handleChange2(date) {
        this.setState({
            birthday: date
        });
    }
    
    handleAffiliation(e) {
        //alert("hello is this working")
        this.setState({
            affiliation: e
        });

        console.log("HELLO" + this.state.affiliation)
        //will make the call to the backend here. 
        //then update 
    }

    handleInterest(e) {
        this.setState({
            interests: e
        });
        console.log(this.state.interests)
    }

    handleSubmit(e) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        e.preventDefault();
        if (this.state.email === "") {
            this.setState({
                error: "Email cannot be empty!"
            })
        } else if (!re.test(this.state.email)) {
            this.setState({
                error : "Email of wrong format!"
            })
        } else if (this.state.password === "" || this.state.confirmpassword === "") {
            this.setState({
                error : "Passwords cannot be empty!"
            })
        } else if (this.state.password !== this.state.confirmpassword) {
            this.setState({
                error : "Passwords do NOT match!!"
            })
        } else if (this.state.first === "" || this.state.last === "") {
            this.setState({
                error : "Please your Name. Numbers only if Elon Musk"
            })
        } 
        else if (this.state.affiliation == undefined) {
            this.setState({
                error : "Please add an Affiliation."
            })
        } else if (this.state.interests == undefined || this.state.interests.length < 2) {
            this.setState({
                error : "Please at least 2 interests"
            })
        } else if (this.state.birthday == undefined) {
            this.setState({
                error : "Come on add your birthday!"
            })
        } else {
            let newUser = {
                email: this.state.email,
                password: this.state.password,
                first_name: this.state.first,
                last_name: this.state.last,
                birthday: moment(this.state.birthday).unix(),
                affiliation: this.state.affiliation.label,
                //interests is NOW an array. To do with rafa please dont forget. 
                interest: "test",//this.state.interests,
                profile_pic: "https://pennbook.s3.amazonaws.com/default-profile.jpg"
            };
            
            var request = $.post(config.serverUrl + "/user/create", newUser);
            request.done((result) => {
                this.setState({
                    error : ""
                });
                this.setState({redirect: <div><Redirect to="/home"/></div>});
            }) 
            request.fail((err) => {
                this.setState({
                    error : "Email already in use!"
                });
            });
        }
    }

    render () {
        return(
            <div className="card col-12 col-lg-5 login-card mt-4 hv-center p-4">
                {this.state.redirect}
                <h1> Register for PennBooks Here:</h1>
            Email:
              <input type="email" 
                               className="form-control" 
                               id="email" 
                               placeholder="Enter email" 
                               value={this.state.email}
                               onChange={this.handleChange}
                        />
            Password:
              <input type="password" 
                                className="form-control" 
                                id="password" 
                                placeholder="Password"
                                value={this.state.password}
                                onChange={this.handleChange} 
                            />
        
            Confirm Password:
              <input type="password" 
                                className="form-control" 
                                id="confirmpassword" 
                                placeholder="Retype your password"
                                value={this.state.confirmpassword}
                                onChange={this.handleChange} 
                            />
            First Name: 
              <input type="first" 
                                className="form-control" 
                                id="first" 
                                placeholder="First Name"
                                value={this.state.first}
                                onChange={this.handleChange} 
                            />
            Last Name: 
              <input type="last" 
                                className="form-control" 
                                id="last" 
                                placeholder="Last Name"
                                value={this.state.last}
                                onChange={this.handleChange} 
                            />
            Affiliation:
            <Select
                value={this.state.affiliation}
                onChange={this.handleAffiliation}
                options={this.state.optionsAffiliation}
                placeholder="Add your affiliation to Pennbooks"
              />
        
            Interest (2):
            <Select
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={this.handleInterest}
                //value={this.state.interests}
                options={this.state.optionsInterest}
                placeholder="Add your interest to Pennbooks"
                isMulti
                isSearchable={true}
                closeMenuOnSelect={false}
              />
        
              Birthday: 
              <DatePicker 
                            onChange={this.handleChange2} 
                            selected={this.state.birthday}
                            value={this.state.birthday}
                            maxDate={new Date("2020, 12, 17")}
                            dateFormat="MM/dd/yyyy"
                        />
        
                <button 
                            type="submit" 
                            className="btn btn-primary mt-4 mb-2"
                            onClick={this.handleSubmit}
                  >
                            Register
                  </button>
        
                  Already a User? <a href="/"> Login Here. </a>
                  <p class = "text-danger">
                    {this.state.error}
                  </p>
              </div>
            )
    }
    
}

export default RegistrationForm;