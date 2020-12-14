import React, {useState} from 'react'
import { Button } from 'react-bootstrap'
import Username from './Username.js'
import $ from 'jquery'
var config = require('./Config.js')

//comment should just take in an ID. 
class Comment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {};
  }

  componentWillMount() {
    //this.refreshID = setInterval(() => this.refresh(), config.refreshTime);
    //Make call to backend to get POST details
    if (this.props.id) {
        var request = $.post(config.serverUrl + 'post/comment/' + this.props.id + '/get');
        request.done((result) => {
            console.log(result);
            this.setState({
                //posted by
                userID: result.author,
                //optional, posted on whose wall
                text: result.text,
            });
        });
    }
}
  render () {
    return (
      <div style={{paddingTop: 20}}>
      <div className="card">
        <div class="card-header">
          <Username id = {this.state.userID}/>
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