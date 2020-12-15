import React from 'react';
import Messages from './Messages'
import Chatheader from './Chatheader'
import MessageTyper from './MessageTyper'
import socketIOClient from "socket.io-client";
import './column.css';

var config = require('./Config.js')

class Messagetable extends React.Component {
    constructor(props) {
        super(props);
        const socket = socketIOClient(config.socketUrl)
        this.state = {id: this.props.match.params.id, socket: socket};
    }

    render() {
        return(
            <div className="container mb-10 p-40 w-75% max-auto">
                <div class="row">
                    <div class="col">
                        <Chatheader/>
                    </div>
                </div>
                <div class="row">
                    <div class="col col-scroll col-scroll-messages">
                        <Messages socket={this.state.socket}/>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <MessageTyper socket={this.state.socket} id={this.state.id}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Messagetable;