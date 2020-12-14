import React, {useState} from 'react';
import $ from 'jquery';
var config = require("./Config.js");

class Username extends React.Component {
    constructor(props) {
      super(props);
      this.state = {status: "Online"};
    }

    componentDidMount() {
        this.refreshID = setInterval(() => this.refresh(), config.refreshTime);
        //Make call to backend to get username details
        if (this.props.id) {
            this.setState({ status: "Online", userURL: '/user/' + this.props.id})
            var request = $.post(config.serverUrl + '/user/' + this.props.id + '/get');
            request.done((result) => {
                this.setState({
                    firstName: result.first_name,
                    lastName: result.last_name,
                }); 
            });
            request.fail((err) => {
                this.setState({
                    firstName: "User",
                    lastName: "not found",
                    userURL: undefined
                });
            });
        }
    }

    componentWillUnmount() {
        clearInterval(this.refreshID);
    }

    refresh() {
        //Check if user is online

        var isOnline = true;
        if(isOnline) {
            this.setState({
                status: "Online"
            });
        } else {
            this.setState({
                status: "Offline"
            });
        }

    }

    render() {
        return (
            <div class="container p-0 m-0 d-flex flex-row align-items-center">
                {this.props.showImage === "true" ? <img className="rounded-circle p-0 m-0" src="https://pennbook.s3.amazonaws.com/Screen+Shot+2020-01-14+at+3.24.25+AM.png" style={{maxWidth:40}} /> : null}
                <div class="d-flex flex-column align-items-start pl-2 justify-content-center">
                    <a class="p-0 m-0" href={this.state.userURL}>{this.state.firstName} {this.state.lastName}</a>
                    <small class={(this.state.status === "Online") ? "text-success m-0 p-0" : "text-muted m-0 p-0"}>{this.state.status}</small>
                </div>
            </div>
        )
    }
}

export default Username;