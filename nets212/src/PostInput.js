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
            uploading: false,
            imageUploadText: "Choose an image to share",
            errorMessage:"",
            clearImageField:"",
            writeText: ""
        }
    }

    componentDidMount() {
        if (this.props.id) {
            if (this.props.id === localStorage.getItem('user')) {
                this.setState({
                    writeText: "Write something on your wall"
                });
            } else {
                let request = $.post(Config.serverUrl + '/user/' + this.props.id + '/get');
                request.done((result) =>  {
                    this.setState({
                        writeText: "Write something on " + result.first_name + "'s wall"
                    });
                });
            }
        } else {
            this.setState({writeText: "What's on your mind?"});
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
        if(!this.state.uploading && this.state.text !== "") {
            let post = {
                text: this.state.text,
                pictures: this.state.pictures,
                author: localStorage.getItem('user'),
                privacy: 0,
                parent: "0",
                wall: this.props.id !== localStorage.getItem('user') ? this.props.id : undefined
    
            };
            let request = $.post(Config.serverUrl + '/posts/create', post);
            request.done((result) => {
                //Make post show on newsfeed
                this.props.addPost(result.id);
                this.setState({text:"", clearImageField:Date.now(), imageUploadText:"Choose an image to share", errorMessage:"", pictures: []});
            });
        } else if (this.state.uploading) {
            this.setState({errorMessage: "Please wait for the image to finish uploading!"});
        } else if (this.state.text === "") {
            this.setState({errorMessage: "Please enter in some text for your post"});
        } else {
            this.setState({errorMessage: "Something went wrong! :("});
        }

    };

    fileChange = e => {
        if(!e.target.files[0]) return;
        this.setState({uploading:true, imageUploadText: "Uploading " + e.target.files[0].name + "...", errorMessage:""});
        S3FileUpload.uploadFile(e.target.files[0], config).then((data)=> { this.setState({pictures: [data.location], uploading:false, imageUploadText: e.target.files[0].name }); e.target.value = null}).catch((err)=> {alert(err)})
    }

    render() {
        return (
            <div class="container-fluid p-0 mt-3">
                <div className="input-group mb-3 p-0">
                    <input id="theInput" className ="form-control input-lg m-0 pb-0 pt-0" type = 'text' value={this.state.text} placeholder= {this.state.writeText} onChange={this.handleChange}/> 
                    <div className="input-group-append m-0">
                        <button className="btn btn-primary m-0" style={{width:79}} onClick = {this.handleClick}> Post </button>
                    </div>
                </div>
                    <div className="custom-file m-0 p-0">
                        <input key={this.state.clearImageField} className="form-control input-lg m-0 p-0 custom-file-input" type="file" accept="image/x-png,image/gif,image/jpeg" onChange= {this.fileChange} />
                        <label className="custom-file-label m-0" for="inputGroupFile02">{this.state.imageUploadText}</label>
                        <div class="small pt-2 text-danger">{this.state.errorMessage}</div>
                    </div>
            </div>
                
        );
    }

}

export default PostInput;