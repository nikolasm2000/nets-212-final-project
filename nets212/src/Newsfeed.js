import React, {useState} from 'react'
import Navbar from './Navbar.js'


function Newsfeed() {
    return (
        <div>
            <Navbar name="Pranav Aurora" id ="123"/>
            <div style={{backgroundColor: "lightblue", width:750}}>
                <Post text="hello"/>
            </div>
        </div>
    )
}

export default NewsFeed;