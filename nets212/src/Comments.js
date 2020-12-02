import React, {useState} from 'react'
import Comment from './Comment.js'


function Comments(props) {
	//This will produce all the posts that were passed in from an array to newsfeed
	
	let x = 0;

	const posts = props.comments.map((comment) =>
		
		<Comment comment={comment}/>
    );
    return (
        <div>
            {posts}
        </div>
    )
}

export default Comments;