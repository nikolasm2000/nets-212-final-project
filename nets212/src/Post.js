import React, {useState} from 'react'
import Username from './Username';
import Likes from './Likes';
import Comment from './Comment';

function Post(props) {
    return (
        <div class="card mt-4 mb-2" style={{width:750}}>
            <div class="card-header d-flex flex-row pb-0">
                <div class="card-title"> <Username firstName={props.post.user.firstName} lastName={props.post.user.lastName} userURL={props.post.user.userURL}/></div>
                <p class="card-text ml-3"><small class="text-muted">Posted 3 mins ago</small></p>
            </div>
            <div class="card-body">
                <p class="card-text">{props.post.text}</p>
                {props.post.imageURL ? <div> <hr/> <div class="d-flex flex-column align-items-center"> <img src={props.post.imageURL} style={{maxWidth:750}}/> </div> </div>: null}
                <hr/>
                <Likes/>
            </div>

        </div>
    )
}

export default Post;