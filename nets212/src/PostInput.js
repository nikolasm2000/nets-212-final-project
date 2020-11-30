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
            <div class="container-fluid p-0 mt-4">
                <input className ="form-control input-lg" type = 'text' placeholder= "what's on your mind?" id = "text" onChange={handleChange}/> 
                <div className="input-group mb-3">
                    <div className="custom-file">
                        <input type="file" className="custom-file-input" id="inputGroupFile02"/>
                        <label className="custom-file-label" for="inputGroupFile02">choose file</label>
                    </div>
                </div>
                <button className="btn btn-primary" onClick={handleClick}>Post</button>
            </div>
    );
}

export default PostInput;