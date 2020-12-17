import React, {useState} from 'react';
import $ from 'jquery';
import Loader from 'react-loader-spinner'
var config = require("./Config.js");

class Username extends React.Component {
    constructor(props) {
      super(props);
      this.state = {status: "Offline"};
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
                    profile_pic: result.profile_pic,
                    status: result.online ? "Online" : "Offline"
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


    }

    render() {
        return (
            <div class="container p-0 m-0 d-flex flex-row align-items-center">
                {this.props.showImage === "true" ? <img className="rounded-circle p-0 m-0" src={this.state.profile_pic} style={{maxWidth:40, maxHeight:40}} /> : null}
                <div class="d-flex flex-column align-items-start pl-2 justify-content-center">
                    <a class="p-0 m-0" href={this.state.userURL}> {this.state.firstName ? this.state.firstName : <Loader type="ThreeDots" color="#00BFFF" height={20} width={20} />} {this.state.lastName}</a>
                    <small class={(this.state.status === "Online") ? "text-success m-0 p-0" : "text-muted m-0 p-0"}>{this.state.status}</small>
                </div>
            </div>
        )
    }
}

export default Username;