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

  componentDidMount() {
    this.refreshID = setInterval(() => this.refresh(), config.refreshTime);
    //Make call to backend to get username details
    if (this.props.id) {
        var request = $.post(config.serverUrl + '/comment/' + this.props.id + '/get');
        request.done((result) => {
          this.setState = {
            //userID = ____,
            //comment = ____,
          }

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
          <p className="card-text">{this.state.comment}</p>
        </div>
      </div>
    </div>

      
    )
  }


}

// function Comment(props) {
//     const [state , setState] = useState({
//     firstName : props.comment.user.firstName,
//     lastName:  props.comment.user.lastName,
//     comment : props.comment.text,
//     profPic: props.comment.user.profilePic,
//     })



//     return (
//       <div style={{paddingTop: 20}}>
//         <div className="card">
//           <div class="card-header">
//             <Username firstName={state.firstName} lastName={state.lastName} userURL="/id?123" showImage="true"/>
//           </div>
//           <div className="card-body">
//             <p className="card-text">{state.comment}</p>
//           </div>
//         </div>
//       </div>
//     )

// }

export default Comment;