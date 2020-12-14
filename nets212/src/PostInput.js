import React, { useState } from 'react'
import ReactS3 from 'react-s3'
import S3FileUpload from 'react-s3';
import $ from 'jquery'

var Config = require('./Config.js')

const config = {
    bucketName: 'pennbook',
    region: 'us-east-1',
    accessKeyId: 'AKIAID2TRJMEBXW4XKHQ',
    secretAccessKey: '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'
}

function PostInput(props) {
    const [state , setState] = useState({
        text : "",
        imageUrl : "",
    })

    const handleChange = e => {
        const {id , value} = e.target   
        setState({
            text: value
        });
    }

    const handleClick = e => {
        e.preventDefault(); 
        let post = {
            text: state.text,
            pictures: [state.imageUrl],
            author: localStorage.getItem('user'),
            privacy: 0,
            parent: "0"

        };
        let request = $.post(Config.serverUrl + '/posts/create', post);
        request.done((result) => {
            //Make post show on newsfeed
            props.addPost(result.id);
        });
    };

    const fileChange = e => {
        S3FileUpload.uploadFile(e.target.files[0], config).then((data)=> { setState({imageUrl: data.location}) }).catch((err)=> {alert(err)})
    }

    return (
        <div class="container-fluid p-0 mt-3">
            <div className="input-group mb-3 p-0">
                <input id="theInput" className ="form-control input-lg m-0 pb-0 pt-0" type = 'text' placeholder= {props.user ? "Post on " + props.user.firstName + "'s wall" : "What's on your mind?"} onChange={handleChange}/> 
                <div className="input-group-append m-0">
                    <button className="btn btn-primary m-0" style={{width:79}} onClick = {handleClick}> Post </button>
                </div>
            </div>
                <div className="custom-file m-0">
                    <h3>Choose an image:</h3>
                    <input type="file" accept="image/x-png,image/gif,image/jpeg" onChange= {fileChange} />
                   
                </div>
        </div>
            
    );
}

export default PostInput;