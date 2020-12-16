import React, {useState} from 'react'
import Navbar from './NavbarComponent.js'
import Newsfeed from './Newsfeed.js'
import FriendsList from './FriendsList.js'
import Notifications from './Notifications.js'
import FriendSugg from './FriendSugg.js'
import ChatList from './ChatList.js'
import { Redirect } from 'react-router-dom'
import './column.css';
import $ from 'jquery'; 
var config = require("./Config.js");

class HomePage extends React.Component{
    constructor(props) {
        super(props);

        this.state = {userID: '0'};
    } 

    componentDidMount() {
        this.setState( {userID: localStorage.getItem('user')} );
    }

    render() {
        return (
            <div class="container-fluid p-0">
                <Navbar name="Pranav Aurora" id ={this.state.userID}/>
                <div class="container-fluid"> 
                    <div class="row">
                        <div class="col col-scroll">
                            <div class="mt-3">
                                <Notifications/>
                                <div style={{paddingTop: 20}}>
                                <FriendSugg/>
                                </div>
                            </div>
                        </div>
                        <div class="col-6 col-scroll">
                            <Newsfeed/>
                        </div>
                        <div class="col col-scroll">
                            <div class="mt-3">
                                <FriendsList/>
                            </div>
    
                            <div class="mt-3">
                                <ChatList/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
        );

    }

}

export default HomePage;