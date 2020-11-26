import React, {useState} from 'react'

function LoginForm(props) {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        // to implement function that checks if user is authenticated.
    }
    return (
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <h1> Log into PennBooks Here:</h1>
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
                        value={state.confirmpassword}
                        onChange={handleChange} 
                    />
        <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={handleSubmit}
          >
                    Log in. 
          </button>
          Not a user? <a href = '/register'> Register Here. </a>
        </div>
    )

}

export default LoginForm;