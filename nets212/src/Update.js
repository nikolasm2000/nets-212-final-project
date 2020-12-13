import React, {useState} from 'react';
import DatePicker from 'react-date-picker';
import {Redirect} from 'react-router-dom';

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
    const handleChange2 = (date) => {
        console.log(date);
        setState(prevState => ({
            ...prevState,
            birthday: date
        }))
    }

    const handleSubmit = (e) => {
        const {id} = e.target
        //need to update this function.
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
                    onClick={handleSubmit}
                    id="email"
                    >
                Change Email
                </button>   
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
                    onClick={handleSubmit}
                    id="password"
                    >
                Change Password
                </button>  
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
                    onClick={handleSubmit}
                    id="Affiliation"
                    >
                    Change Affiliation
                </button>  
                <br></br>
                <h5>Birthday Change?</h5>
                <DatePicker 
                    onChange={handleChange2} 
                    selected={state.birthday}
                    value={state.birthday}
                />

                <button 
                    type="submit" 
                    className="btn btn-primary mt-3"
                    onClick={handleSubmit}
                    id="birthday"
                    >
                    Change Birthday
                </button>

                <br></br>
                <h5>Change interest in news?</h5>
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
                    onClick={handleSubmit}
                    id="news"
                    >
                    Change News
                </button>  

            </div>

        )
    }
export default Update;