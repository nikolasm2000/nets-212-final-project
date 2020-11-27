import React, {useState} from 'react'
import Navbar from './Navbar.js'
import Post from './Post.js'
import UserPage from './UserPage.js'


function Newsfeed() {
    return (
        <div>
            <Navbar name="Pranav Aurora" id ="123"/>
            <div style={{backgroundColor: "lightblue", width:750}}>
                <Post text="hello"/>
                <UserPage />
            </div>
        </div>
    )
}

export default Newsfeed;