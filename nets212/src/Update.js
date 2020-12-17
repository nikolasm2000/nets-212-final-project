import React, {useState} from 'react';
import Select from 'react-select';
import $ from 'jquery'
var Config = require("./Config.js");

class Update extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email : "",
            password : "",
            confirmpassword : "",
            birthday : "",
            interests: "",
            affiliation: "",
            optionsAffiliation: [],
            optionsInterest: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitAffiliation = this.handleSubmitAffiliation.bind(this);
        this.handleSubmitEmail = this.handleSubmitEmail.bind(this);
        this.handleSubmitInterest = this.handleSubmitInterest.bind(this);
        this.handleSubmitPassword = this.handleSubmitPassword.bind(this);
        this.handleInterest = this.handleInterest.bind(this);
        this.handleAffiliation = this.handleAffiliation.bind(this);
    }

    componentDidMount() {
        var request = $.post(Config.serverUrl + "/affiliations/getAll");
        request.done((result) => {
            var toR = []
            result.forEach(entry => {
                let obj = {value: entry, label: entry}
                toR.push(obj)
            })
            this.setState({optionsAffiliation: toR})
        }
            );
        var request1 = $.post(Config.serverUrl + "/interests/getAll");
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

    handleInterest(e) {
        this.setState({
            interests: e
        });
        console.log("HELLO" + this.state.interests)
        //then update 

    }
    
     
    handleAffiliation(e) {
        //alert("hello is this working")
        console.log("WORKING ANOTH" + e.label)
        this.setState({
            affiliation: e
        });

        console.log("HELLO" + this.state.affiliation)
        //will make the call to the backend here. 
        //then update 
    }

    handleSubmitEmail(e) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        e.preventDefault();
        if (this.state.email === "") {
            this.setState({
                errorEmail: "Email cannot be empty!",
                successEmail : ""
            })
        } else if (!re.test(this.state.email.toLowerCase())) {
            this.setState({
                errorEmail : "Email of wrong format!",
                successEmail : ""
            }) 
        } else {
            this.setState({
                errorEmail : "",
                successEmail : "successfuly changed email"
            })
            let update = {
                id: localStorage.getItem('user'),
                email: this.state.email
            }
            let request1 = $.post(Config.serverUrl + '/user/update', update);
            request1.done((result) => {
            });
        }
    }

    handleSubmitPassword(e) {
        e.preventDefault();
        if (this.state.password === "" || this.state.confirmpassword === "") {
            this.setState({
                errorPassword: "password fields cannot be empty!",
                successPassword : ""
            })
        } else if (this.state.password !==  this.state.confirmpassword) {
            this.setState({
                errorPassword : "passwords DO NOT MATCH",
                successPassword : ""
            }) 
        } else {
            this.setState({
                errorPassword : "",
                successPassword : "successfuly changed password "
            })
            let update = {
                id: localStorage.getItem('user'),
                password: this.state.password
            }
            let request1 = $.post(Config.serverUrl + '/user/update', update);
            request1.done((result) => {
            });
            ///NEED post request to the backend to change password
        }
    }

    handleSubmitAffiliation(e) {
        if (this.state.affiliation === "") {
            this.setState({
                errorAffiliation: "field cannot be empty!",
                successAffiliation : ""
            })
        } else {
            this.setState({
                errorAffiliation: "",
                successAffiliation : "Successfuly Changed Affiliation"
            })
        } 
        //write route to backend later
        // need to trigger a post. 
    }

    handleSubmitInterest(e) {
        if (this.state.interests === "") {
            this.setState({
                errorInterest: "Field cannot be empty!",
                successInterest : ""
            })
        } else {
            this.setState({
                errorInterest: "",
                successInterest : "Successfuly Changed Interest"
            })
        }
        let x = "";
        this.state.interests.forEach(interest => {
            x = x + interest.label + ", "
        })
        x = x.substring(0, x.length-1)

        console.log(x + "X is veri sexc")
        let post = {
            text:  "I just  added " + x + " to my interests.",
            pictures: [this.state.image],
            author: localStorage.getItem('user'),
            privacy: 0,
            parent: "0",
        };
        let request = $.post(Config.serverUrl + '/posts/create', post);
            request.done((result) => {
                console.log("LESSSSGOOOO")
            });
            request.fail((result) => {
                this.setState({error: "there was an error changing your interests"})
            })	
        //write route to backend later
        // need to trigger a post. 
    }
    render () {
        return(
            <div className="card col-12 col-lg-5 login-card mt-4 hv-center p-3 mb-4">
                <h1> Update your account</h1>
                <br></br>

                <h5>Change Email?</h5>
                <input type="email" 
                        className="form-control mt-2" 
                        id="email" 
                        placeholder="Enter new Email"
                        value={this.state.email}
                        onChange={this.handleChange} 
                    />
                <button 
                    type="submit" 
                    className="btn btn-primary mt-3"
                    onClick={this.handleSubmitEmail}
                    id="email"
                    >
                Change Email
                </button>   
                <p class = "text-danger">
                    {this.state.errorEmail}
                 </p>
                 <p class = "text-success">
                    {this.state.successEmail}
                 </p>
                <br></br>
                <h5>Change Password?</h5>
                <input type="password" 
                        className="form-control mt-2" 
                        id="password" 
                        placeholder="Enter new Password"
                        value={this.state.password}
                        onChange={this.handleChange} 
                    />
                <input type="password" 
                        className="form-control mt-2" 
                        id="confirmpassword" 
                        placeholder="ConfirmPassword"
                        value={this.state.confirmpassword}
                        onChange={this.handleChange} 
                    />

                <button 
                    type="submit" 
                    className="btn btn-primary mt-3"
                    onClick={this.handleSubmitPassword}
                    id="password"
                    >
                Change Password
                </button>  
                <p class = "text-danger">
                    {this.state.errorPassword}
                 </p>
                 <p class = "text-success">
                    {this.state.successPassword}
                 </p>
                <br></br>

                <h5>Change Affiliation?</h5>
                <Select
                value={this.state.affiliation}
                onChange={this.handleAffiliation}
                options={this.state.optionsAffiliation}
                placeholder="Add your affiliation to Pennbooks"
              /> 
                <button 
                    type="submit" 
                    className="btn btn-primary mt-3"
                    onClick={this.handleSubmitAffiliation}
                    id="Affiliation"
                    >
                    Change Affiliation
                </button>  
                <br></br>

                <p class = "text-danger">
                    {this.state.errorAffiliation}
                 </p>
                 <p class = "text-success">
                    {this.state.successAffiliation}
                 </p>

                <br></br>
                <h5>Add a new interest in news</h5>
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

                <button 
                    type="submit" 
                    className="btn btn-primary mt-3"
                    onClick={this.handleSubmitInterest}
                    id="news"
                    >
                    Add a news Interest!
                </button>  
                <p class = "text-danger">
                    {this.state.errorInterest}
                 </p>
                 <p class = "text-success">
                    {this.state.successInterest}
                 </p>
                 <a class="text-center text-center lead" href='/home'>Return to homepage </a>

            </div>

        )
    }
    
    }
export default Update;