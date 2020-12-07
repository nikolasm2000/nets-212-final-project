import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import Username from './Username.js'
import './friendstyle.css';


class Friend extends React.Component {
    constructor(props) {
      super(props);
      this.handleMessage = this.handleMessage.bind(this);
      this.state = {status: "Online"};
    }

    handleMessage() {
        if (this.state.status === "Online") {
            this.setState({status: "Offline"});
        } else {
            this.setState({status: "Online"});
        }
    }

    render() {
    
        return (
        <div class="container p-2 pl-3 friend m-0">
            <div class="row align-items-center">
                <div class="col-6 pr-0 mr-0">
                    <Username firstName="Pranav" lastName="Aurora" userURL="/id?123" showImage="true"/>
                </div>
                <div class="col-2 p-0 m-0">
                    <p class="card-text m-0 p-0"><small class={(this.state.status === "Online") ? "text-success" : "text-muted"}>{this.state.status}</small></p>
                </div>
                <div class="col">
                    <button type="button" class="btn btn-sm btn-outline-primary ml-4" onClick={this.handleMessage}>
                        Message
                    </button>
                </div>


            </div>
        </div>
        );
      }
}


export default Friend;

