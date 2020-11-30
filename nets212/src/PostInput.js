import React, { useState } from 'react'


function PostInput() {
    const [state , setState] = useState({
        text : "",
        imageUrl : "",
    })

    const handleChange = e => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const handleClick = e => {
        e.preventDefault();

        //need to upload the image to the s3 bucket, get the URl, and set the state.
        
        
    };
    return (
        <div>
            <div className="input-group mb-3">
                <input className ="form-control input-lg" type = 'text' placeholder= "what's on your mind?" id = "text" onChange={handleChange}/> 
                <div className="input-group-append">
                    <button className="btn btn-primary" onClick = {handleClick}> Post </button>
                </div>
            </div>
                <div className="custom-file">
                    <input type="file" className="custom-file-input" id="inputGroupFile02" accept="image/x-png,image/gif,image/jpeg" />
                    <label className="custom-file-label" for="inputGroupFile02">choose file</label>
                </div>
        </div>
            
    );
}

export default PostInput;