import React, { useState } from 'react'
import ReactS3 from 'react-s3'

const config = {
    bucketName: 'testfinalproject',
    region: 'us-east-1',
    accessKeyId: '',
    secretAccessKey: ''
}

function PostInput(props) {
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
        
    };

    const fileChange = e => {
        console.log(e.target.files[0])
        ReactS3.uploadFile(e.target.files[0], config)
        .then( (data) => {
            console.log(data)
        })
        .catch( (err)=>{
            alert(err)
        })
    }

    return (
        <div class="container-fluid p-0 mt-3">
            <div className="input-group mb-3 p-0">
                <input className ="form-control input-lg m-0 pb-0 pt-0" type = 'text' placeholder= {props.user ? "Post on " + props.user.firstName + "'s wall" : "What's on your mind?"} id = "text" onChange={handleChange}/> 
                <div className="input-group-append m-0">
                    <button className="btn btn-primary m-0" style={{width:79}} onClick = {handleClick}> Post </button>
                </div>
            </div>
                <div className="custom-file m-0">
                    <input type="file" className="custom-file-input m-0 pb-0 pt-0" id="inputGroupFile02" accept="image/x-png,image/gif,image/jpeg" onChange= {fileChange} />
                    <label className="custom-file-label m-0" for="inputGroupFile02">Choose an image to share</label>
                </div>
        </div>
            
    );
}

export default PostInput;