import React, { useState } from 'react'
import ReactS3 from 'react-s3'

const config = {
    bucketName: 'testfinalproject',
    region: 'us-east-1',
    accessKeyId: '',
    secretAccessKey: ''
}

function CommentInput() {
    const [state , setState] = useState({
        text : "",
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
        
    };

    

    return (
        <div class="container-fluid p-0 mt-3">
            <div className="input-group mb-3 p-0">
                <input className ="form-control input-lg m-0 pb-0 pt-0" type = 'text' placeholder= "Leave a comment..." id = "text" onChange={handleChange}/> 
                <div className="input-group-append m-0">
                    <button className="btn btn-primary m-0" style={{width:79}} onClick = {handleClick}> Post </button>
                </div>
            </div>
        </div>
            
    );
}

export default CommentInput;