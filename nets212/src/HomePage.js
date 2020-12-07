import React, {useState} from 'react'
import Navbar from './Navbar.js'
import Newsfeed from './Newsfeed.js'
import FriendSugg from './FriendSugg.js'
import './column.css';

function HomePage(props) {

    return (
        <div class="container-fluid p-0">
            <Navbar name="Pranav Aurora" id ="123"/>
            <div class="container-fluid"> 
                <div class="row">
                    <div class="col">
                        <div class="mt-3">
                            <FriendSugg/>
                        </div>
                    </div>
                    <div class="col-6 col-scroll">
                        <Newsfeed posts={props.posts}/>
                    </div>
                    <div class="col col-scroll">
                    </div>
                </div>
            </div>
        </div>

    )
}

export default HomePage;