import React, { useState } from 'react'
import ReactS3 from 'react-s3'
import $ from 'jquery'
import Loader from 'react-loader-spinner'

var Config = require('./Config.js')

const config = {
    bucketName: 'testfinalproject',
    region: 'us-east-1',
    accessKeyId: '',
    secretAccessKey: ''
}




class CommentInput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {text: "", posting:false, errorMessage:""}
    }

    handleChange = e => {
        this.setState({text: e.target.value})
    }

    handleClick = e => {
        if (!this.state.posting && this.state.text !== "") {
            this.setState({posting:true});
            let post = {
                text: this.state.text,
                author: localStorage.getItem('user'),
                privacy: 0,
                parent: this.props.postid,
            };
            //route to make a comment
            let request = $.post(Config.serverUrl + '/posts/comments/create', post);
                request.done((result) => {
                    this.setState({text:"", errorMessage:"", posting:false})
                    this.props.addComment(result.id);
                })
        } else {
            this.setState({errorMessage:"Please type in your comment first!"})
        }


    }

    render() {
        return (
            <div class="container-fluid p-0 mt-3">
            <div className="input-group mb-1 p-0">
                <input className ="form-control input-lg m-0 pb-0 pt-0" type = 'text' placeholder= "Leave a comment..." id = "text" onChange={this.handleChange} value={this.state.text}/> 
                <div className="input-group-append m-0">
                <button className="btn btn-primary m-0" style={{width:79}} onClick = {this.handleClick}> {this.state.posting ? <Loader type="TailSpin" color="#00BFFF" height={20} width={20} /> : <div class="m-0 p-0">Post</div>} </button>
                </div>
            </div>
            <div class="small pt-2 text-danger mt-0 p-0">{this.state.errorMessage}</div>
        </div>
        )
    }
}

export default CommentInput;