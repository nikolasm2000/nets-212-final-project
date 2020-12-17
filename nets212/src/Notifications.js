import React, {useState} from 'react'
import Notification from './Notification.js'
import FriendRequest from './FriendRequest'
import ChatRequest from './ChatRequest'
import $ from 'jquery'
import { Collapse } from 'react-bootstrap'

var config = require('./Config.js')
class Notifications extends React.Component{

    constructor(props) {
        super(props);
        this.state = {notifications: [], text: "Notifications"}
        this.refresh = this.refresh.bind(this);
    }

    componentDidMount() {
        this.refreshID = setInterval(() => this.refresh(), config.refreshTime);
        //Update list of notifications
        let request = $.post(config.serverUrl + '/notifications');
        request.done((result) => {
            this.setState({
                notifications: result.Items ? result.Items : [],
                text: "Notifications (" + result.Count + ")"
            });
        });
    }

    componentWillUnmount() {
        clearInterval(this.refreshID);
    }

    refresh() {
        //Update list of notifications
        let request = $.post(config.serverUrl + '/notifications');
        request.done((result) => {
            this.setState({
                notifications: result.Items ? result.Items : [],
                text: "Notifications (" + result.Count + ")",
            
            });
        });
    }

    render() {
        const notifications = this.state.notifications.map((notification) => {
            if(notification.type === 0) {
                return <div class="m-0 p-0" ><Notification notification={notification} refresh={this.refresh}/><hr class="m-0 p-0"/></div>
            } else if(notification.type === 1) {
                return <div class="m-0 p-0" ><FriendRequest notification={notification} refresh={this.refresh}/><hr class="m-0 p-0"/></div>
            } else if(notification.type === 2) {
                return <div class="m-0 p-0" ><ChatRequest notification={notification} refresh={this.refresh}/><hr class="m-0 p-0"/></div>
            }
            
        });
        return (
            <div class="card container-fluid p-0 m-0">
                <div class="container p-0 m-0">
                    <div className="card-header pb-0 pl-3" style={{paddingTop: 10}}>
                        <div class="row align-items-end">
                            <div class="col-1">
                            <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-bell" fill="currentColor" xmlns="http://www.w3.org/2000/svg"  onClick={this.setOpen}>
                                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2z"/>
                                <path fill-rule="evenodd" d="M8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
                            </svg>
                        </div>
                            <div class="col">
                                <h5 class="card-title ml-2"><b>{this.state.text}</b></h5>	
                            </div>
                        </div>
                    </div>                 
                    <div class="card-body p-0">
                        {notifications}
                    </div>
                </div>
            </div>
        );
    }
}

export default Notifications;