import React, {useState} from 'react'
var config = require("./Config.js")

class Username extends React.Component {
    constructor(props) {
      super(props);
      this.state = {status: "Online"};
    }

    componentDidMount() {
        this.refreshID = setInterval(() => this.refresh(), config.refreshTime);
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
                    <a class="p-0 m-0" href={this.props.userURL}>{this.props.firstName} {this.props.lastName}</a>
                    <small class={(this.state.status === "Online") ? "text-success m-0 p-0" : "text-muted m-0 p-0"}>{this.state.status}</small>
                </div>
            </div>
        )
    }
}

export default Username;