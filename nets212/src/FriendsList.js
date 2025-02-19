import React, {useState} from 'react'
import Friend from './Friend.js';
import $ from 'jquery'

var config = require('./Config.js')

class FriendsList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {friends: []};
      this.refresh = this.refresh.bind(this);
    }
    componentDidMount() {
        this.refreshID = setInterval(() => this.refresh(), config.refreshTime);
        let request = $.post(config.serverUrl + '/friends');
        request.done((result) => {
            this.setState({
                friends: result
            });
        });
    }

    componentWillUnmount() {
        clearInterval(this.refreshID);
    }

    refresh() {
        //Update list of online friends
        let request = $.post(config.serverUrl + '/friends');
        request.done((result) => {
            this.setState({
                friends: result
            });
        });
    }

    render() {
        const friends = this.state.friends.map((friend) => {
            return <div class="m-0 p-0" key={friend}><Friend id={friend} refresh={this.refresh}/><hr class="m-0 p-0"/></div>;
        });

        return(
        <div class="card container-fluid p-0 m-0">
            <div class="container p-0 m-0">
                <div className="card-header pb-0 pl-3" style={{paddingTop: 10}}>
                    <div class="row align-items-end">
                        <div class="col-1">
                            <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-people ml-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1h7.956a.274.274 0 0 0 .014-.002l.008-.002c-.002-.264-.167-1.03-.76-1.72C13.688 10.629 12.718 10 11 10c-1.717 0-2.687.63-3.24 1.276-.593.69-.759 1.457-.76 1.72a1.05 1.05 0 0 0 .022.004zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10c-1.668.02-2.615.64-3.16 1.276C1.163 11.97 1 12.739 1 13h3c0-1.045.323-2.086.92-3zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
                            </svg>
                        </div>
                        <div class="col">
                            <h5 class="card-title ml-3"><b>Friends</b></h5>	
                        </div>
                    </div>
                </div>
                <div class="card-body p-0">
                    {friends}
                </div>
            </div>
        </div>
    );
    }
}

export default FriendsList;