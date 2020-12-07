import React, {useState} from 'react'
import { Button } from 'react-bootstrap'
import Username from './Username.js'

function Comment(props) {
    const [state , setState] = useState({
    firstName : props.comment.user.firstName,
    lastName:  props.comment.user.lastName,
    comment : props.comment.text,
    profPic: props.comment.user.profilePic,
    })

    return (
      <div style={{paddingTop: 20}}>
        <div className="card">
          <div class="card-header">
            <Username firstName={state.firstName} lastName={state.lastName} userURL="/id?123" showImage="true"/>
          </div>
          <div className="card-body">
            <p className="card-text">{state.comment}</p>
          </div>
        </div>
      </div>
    )

}

export default Comment;