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

class PostInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text : "",
            pictures : [],
            uploading: false
        }
    }

    handleChange = e => {
        const {id , value} = e.target   
        this.setState({
            text: value
        });
    }

    handleClick = e => {
        e.preventDefault(); 
        if(!this.state.uploading) {
            let post = {
                text: this.state.text,
                pictures: this.state.pictures,
                author: localStorage.getItem('user'),
                privacy: 0,
                parent: "0"
    
            };
            let request = $.post(Config.serverUrl + '/posts/create', post);
            request.done((result) => {
                //Make post show on newsfeed
                this.props.addPost(result.id);
            });
        } else {
            alert("Image still uploading!");
        }

    };

    fileChange = e => {
        this.setState({uploading:true});
        S3FileUpload.uploadFile(e.target.files[0], config).then((data)=> { this.setState({pictures: [data.location], uploading:false })}).catch((err)=> {alert(err)})
    }

    render() {
        return (
            <div class="container-fluid p-0 mt-3">
                <div className="input-group mb-3 p-0">
                    <input id="theInput" className ="form-control input-lg m-0 pb-0 pt-0" type = 'text' placeholder= {this.props.user ? "Post on " + this.props.user.firstName + "'s wall" : "What's on your mind?"} onChange={this.handleChange}/> 
                    <div className="input-group-append m-0">
                        <button className="btn btn-primary m-0" style={{width:79}} onClick = {this.handleClick}> Post </button>
                    </div>
                </div>
                    <div className="custom-file m-0">
                        <h3>Choose an image:</h3>
                        <input type="file" accept="image/x-png,image/gif,image/jpeg" onChange= {this.fileChange} />
                       
                    </div>
            </div>
                
        );
    }

}

export default PostInput;