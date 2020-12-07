import React, {useState} from 'react'
import Navbar from './Navbar.js'
import Post from './Post.js'
import UserPage from './UserPage.js'
import Likes from './Likes.js'
import Comment from './Comment.js'
import FriendSugg from './FriendSugg.js'
import PostInput from './PostInput.js'


function Newsfeed(props) {
    //This will produce all the posts that were passed in from an array to newsfeed
    const posts = props.posts.map((post) =>
        <Post post={post}/>
    );
    return (
        <div>
            <PostInput/>
            <hr class="mt-4 mb-0 p-0"/>
            <div class="d-flex flex-column align-items-center">
                {posts}
            </div>
            <br/>
        </div>
    )
}

export default Newsfeed;