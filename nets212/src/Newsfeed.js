import React, {useState} from 'react'
import Navbar from './Navbar.js'
import Post from './Post.js'
function Newsfeed() {
    return (
        <div>
            <Navbar/>
            <div style={{backgroundColor: "lightblue", width:750}}>
                <Post text="hello"/>
            </div>
        </div>
    )
}

export default Newsfeed;