import React, { useState } from 'react'
import ReactS3 from 'react-s3'
import $ from 'jquery'
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
        this.state = {text: ""}
    }

    handleChange = e => {
        this.setState({text: e.target.value})
    }

    handleClick = e => {
        let post = {
            text: this.state.text,
            author: localStorage.getItem('user'),
            privacy: 0,
            parent: this.props.postid,
        };
        //route to make a comment
        let request = $.post(Config.serverUrl + '/posts/comments/create', post);
            request.done((result) => {
                this.setState({text:""})
                this.props.addComment(result.id);
            })

    }

    render() {
        return (
            <div class="container-fluid p-0 mt-3">
            <div className="input-group mb-3 p-0">
                <input className ="form-control input-lg m-0 pb-0 pt-0" type = 'text' placeholder= "Leave a comment..." id = "text" onChange={this.handleChange} value={this.state.text}/> 
                <div className="input-group-append m-0">
                    <button className="btn btn-primary m-0" style={{width:79}} onClick = {this.handleClick}> Post </button>
                </div>
            </div>
        </div>
        )
    }
}

export default CommentInput;