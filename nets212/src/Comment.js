import React, {useState} from 'react'
import { Button } from 'react-bootstrap'
import Username from './Username.js'
import $ from 'jquery'
import moment from 'moment'

var config = require('./Config.js')


//comment should just take in an ID. 
class Comment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {userID: "", text: ""};
  }

  componentWillMount() {
    //this.refreshID = setInterval(() => this.refresh(), config.refreshTime);
    //Make call to backend to get POST details
    if (this.props.id) {
        var request = $.post(config.serverUrl + '/posts/comments/' + this.props.id + '/get');
        request.done((result) => {
            this.setState({
                //posted by
                userID: result.author,
                //optional, posted on whose wall
                text: result.text,
                timeStamp: "Posted " + moment.unix(result.createdAt).fromNow(),
            });
        });
    }
}

  render () {
    var username;
    if(this.state.userID) {
        username = <Username id={this.state.userID} showImage="true"/>;
    }
    return (
      <div style={{paddingTop: 20}}>
      <div className="card">
        <div class="card-header m-0 p-1 pl-2 row align-items-start justify-content-between">
          <div class="col-auto m-0 p-0 mt-1">
            {username}
          </div>
          <div class="col-auto m-0 p-0 mr-2 mt-1">
            <p class="card-text"><small class="text-muted">{this.state.timeStamp}</small></p>
          </div>
        </div>
        <div className="card-body">
          <p className="card-text">{this.state.text}</p>
        </div>
      </div>
    </div>
    )
  }
}
export default Comment;