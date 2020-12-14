import React, {useState} from 'react'
import Navbar from './Navbar.js'
import Newsfeed from './Newsfeed.js'
import UserComponent from './UserComponent.js'
import Notifications from './Notifications.js'
import $ from 'jquery'
import {Redirect} from 'react-router-dom'
import './column.css';
var config = require('./Config.js')

class UserPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {id: this.props.match.params.id};
    }

    componentWillMount() {
        /*let request = $.post(config.serverUrl + '/user/' + this.state.id + '/get');
        request.done((result) =>  {

        });

        request.fail((result) => {

        })*/
    }



    
    render() {

        var posts = [{text:"Hey sexy guy can I see your banana?", user:{firstName:"Henrique", lastName:"Lorente", userURL:"id=?2131"}, user2:{firstName:"Pranav", lastName:"Aurora", userURL:"id=?123"} }, {text: "Male stripper looking for gigs. Police uniform $10 extra, happy endings $30 extra.", user:{firstName:"Pranav", lastName:"Aurora", userURL:"/id=2312"}, imageURL:"https://scontent.ffxe1-1.fna.fbcdn.net/v/t1.0-9/55817175_1278692865621197_1432642661486952448_n.jpg?_nc_cat=109&ccb=2&_nc_sid=a4a2d7&_nc_ohc=5yGvxbSXra8AX-nMbDB&_nc_ht=scontent.ffxe1-1.fna&oh=1e14b237408342c652ac4f440691df0e&oe=5FE99984"},
        {text:"Hey guys this is a post lol", user:{firstName:"Henrique", lastName:"Lorente", userURL:"id=?2131"} }];
        var usercomp;
        if(this.state.id) {
            usercomp = <UserComponent id={this.state.id}/>
        }

        return (
            <div class="container-fluid p-0">
                <Navbar/>
                {usercomp}
                <div class="container-fluid"> 
                    <div class="row">
                        <div class="col">
                            <div class="mt-3">
                                <Notifications/>
                            </div>
                        </div>
                        <div class="col-6 col-scroll">
                            <Newsfeed id={this.state.id}/>
                        </div>
                        <div class="col col-scroll">
                        </div>
                    </div>
                </div>
            </div>
    
        );
    }
}

export default UserPage;