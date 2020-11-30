import React, {useState} from 'react'
import Navbar from './Navbar.js'
import Newsfeed from './Newsfeed.js'



function HomePage(props) {

    return (
        <div class="container-fluid p-0">
            <Navbar name="Pranav Aurora" id ="123"/>
            <div class="container-fluid d-flex flex-column align-items-center"> 
                <Newsfeed posts={props.posts}/>
            </div>
        </div>

    )
}

export default HomePage;