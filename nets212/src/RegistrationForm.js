import React, {useState} from 'react'
import DatePicker from 'react-date-picker' 


function RegistrationForm(props) {
    const [state , setState] = useState({
        email : "",
        password : "",
        confirmpassword : "",
        first : "",
        last : "",
        affiliation: "",
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

    const handleSubmit = (e) => {
        e.preventDefault();
        // to implement function to send data to backend. 
    }
    
    const switchtoLogin = () => {
        props.history.push(`/`);
    }

    return(
      <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
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
                        placeholder="Affiliation to PennBooks"
                        value={state.affiliation}
                        onChange={handleChange} 
                    />

      Birthday: 
      <DatePicker 
                    onChange={handleChange2} 
                    selected={state.birthday}
                    value={state.birthday}
                />

        <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={handleSubmit}
          >
                    Register
          </button>

          Already a User? <a href="/"> Login Here. </a>
      </div>
    )
}

export default RegistrationForm;