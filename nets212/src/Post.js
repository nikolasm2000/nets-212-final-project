import React, {useState} from 'react'
import Username from './Username';

function Post(props) {
    return (
        <div class="card" stlye="width:200px">
            <div class="card-body">
                <div class="card-title"> <Username name="Test" userURL="/test"/></div>
                <p class="card-text">{props.text}</p>
                <img src={props.imageURL}/>
                <p>Likes: {props.likes}</p>
            </div>

        </div>
    )
}

export default Post;