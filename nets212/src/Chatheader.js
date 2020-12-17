import React from 'react'
import Username from './Username'
import Searcher from './Searcher'
import {Redirect, Route} from 'react-router-dom';
import $ from 'jquery'

var config = require('./Config.js')
class Chatheader extends React.Component {
    state = {
    redirect: false,
    users:[]
  }
  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/home/' />
    }
  }


  componentDidMount() {
    this.refreshID = setInterval(() => this.refresh(), config.refreshTime);
    //Update list of users
    let request = $.post(config.serverUrl + '/chats/' + this.props.id + '/getusers');
    request.done((result) => {
        this.setState({
            users: result
        });
    });
}

componentWillUnmount() {
    clearInterval(this.refreshID);
}

refresh() {
    //Update list of users
    let request = $.post(config.serverUrl + '/chats/');
    request.done((result) => {
        this.setState({
            users:[]
        });
    });
}


    render () {

        const users = this.state.users.map((user) => {
            return (
                <div class="mr-2" key={user}>
                    <Username id={user} showImage="true"/>
                </div>
            )
            
        });

        return (
            <div className = "container pd-2 mt-2 mb-2">
                {this.renderRedirect()}
                <div class = "border row box layout align-items-center justify-content-between p-2">
                    <div class = "col-7 m-0 p-0">
                        <div class="d-flex flex-row m-0 p-0 align-items-center justify-content-start" style={{overflowX: "auto"}}>
                            {users}
                        </div>
                    </div>

                    <div class = "col-auto" > 
                        <Searcher placeholder="users to chat"/>
                    </div>
                    <div class = "col-auto "> 
                        <button type="button" class="btn btn-sm btn-danger pr-3 pl-3">
                            <a class="text-secondary" href='/home'>Leave Chat</a>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}


export default Chatheader;