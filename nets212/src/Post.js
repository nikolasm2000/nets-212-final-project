import React, {useState} from 'react'
import Username from './Username';
import Likes from './Likes';
import Comments from './Comments.js';

const comments = [{text:"Damn I look good in this!", user:{firstName:"Pranav", lastName:"Aurora", userURL:"id=?2131", profilePic: "https://scontent.ffxe1-1.fna.fbcdn.net/v/t1.0-9/55817175_1278692865621197_1432642661486952448_n.jpg?_nc_cat=109&ccb=2&_nc_sid=a4a2d7&_nc_ohc=5yGvxbSXra8AX-nMbDB&_nc_ht=scontent.ffxe1-1.fna&oh=1e14b237408342c652ac4f440691df0e&oe=5FE99984"} }, 
  {text:"Wow! I need this officer to arrest me...", user:{firstName:"Stacy", lastName:"K.", userURL:"id=?2231", profilePic: "https://aws-logs-794770869316-us-east-1.s3.amazonaws.com/pic5.jpg"} },
{text:"Real cute fella this guy", user:{firstName:"Stan", lastName:"Smith", userURL:"id=?133", profilePic: "https://aws-logs-794770869316-us-east-1.s3.amazonaws.com/pic3.jpg"} },
{text:"Can you do it for $5?", user:{firstName:"Terrence", lastName:"T.", userURL:"id=?19", profilePic: "https://aws-logs-794770869316-us-east-1.s3.amazonaws.com/pic4.jpg"} }];


function Post(props) {
    return (
        <div class="card mt-4 mb-2 container-fluid p-0 m-0">
            <div class="card-header d-flex flex-row pb-2 align-items-center justify-content-between">
                <div class="card-title m-0 p-0"> <Username firstName={props.post.user.firstName} lastName={props.post.user.lastName} userURL={props.post.user.userURL} showImage="true"/></div>
                <p class="card-text m-0 p-0 ml-3"><small class="text-muted">Posted 3 mins ago</small></p>
            </div>
            <div class="card-body">
                <p class="card-text">{props.post.text}</p>
                {props.post.imageURL ? <div> <hr/> <div class="d-flex flex-column align-items-center"> <img class="img-fluid" src={props.post.imageURL}/> </div> </div>: null}
                <hr/>
                <Likes/>
                <Comments  comments = {comments} />
            </div>
        </div>
    )
}

export default Post;