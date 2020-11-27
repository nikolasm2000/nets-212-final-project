import React, {useState} from 'react'
import DatePicker from 'react-date-picker' 

class Update extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: "", email: "", birthday:"", affiliation: "", news:"", password:"", confirmpassword:""};
    } 
    handleChange = (e) => {
        const {id , value} = e.target
        this.setState={id: value};
    }

    handleChange2 = (date) => {
        this.setState={birthday: date}
    }

    handleSubmit = (e) => {
        const {id} = e.target
        //need to update this function.
    }
    render () {
        return(
            <div className="card col-12 col-lg-6 login-card mt-4 hv-center">
                <h1> Update your account</h1>
                <br></br>

                <h5>Change Email?</h5>
                <input type="email" 
                        className="form-control" 
                        id="email" 
                        placeholder="Enter new Email"
                        value={this.state.email}
                        onChange={this.handleChange} 
                    />
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={this.handleSubmit}
                    id="email"
                    >
                Change Email
                </button>   
                <br></br>

                <h5>Change Password?</h5>
                <input type="password" 
                        className="form-control" 
                        id="password" 
                        placeholder="Enter new Password"
                        value={this.state.password}
                        onChange={this.handleChange} 
                    />

                <input type="password" 
                        className="form-control" 
                        id="confirmpassword" 
                        placeholder="ConfirmPassword"
                        value={this.state.confirmpassword}
                        onChange={this.handleChange} 
                    />

                <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={this.handleSubmit}
                    id="password"
                    >
                Change Password
                </button>  
                <br></br>

                <h5>Change Affiliation?</h5>
                <input type="email" 
                        className="form-control" 
                        id="affiliation" 
                        placeholder="Enter new Affiliation"
                        value={this.state.affiliation}
                        onChange={this.handleChange} 
                    />
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={this.handleSubmit}
                    id="Affiliation"
                    >
                    Change Affiliation
                </button>  
                <br></br>
                <h5>Birthday Change?</h5>
                <DatePicker 
                    onChange={this.handleChange2} 
                    selected={this.state.birthday}
                    value={this.state.birthday}
                />

                <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={this.handleSubmit}
                    id="password"
                    >
                    Change Birthday
                </button>

                <br></br>
                <h5>Change interest in news?</h5>
                <input type="email" 
                        className="form-control" 
                        id="news" 
                        placeholder="Enter new Interest"
                        value={this.state.news}
                        onChange={this.handleChange} 
                    />

                <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={this.handleSubmit}
                    id="news"
                    >
                    Change News
                </button>  

            </div>

        )
    }
}

export default Update;