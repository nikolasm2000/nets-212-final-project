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
<<<<<<< HEAD
        <div className="card">
          <div class="card-header">
            <Username firstName={state.firstName} lastName={state.lastName} userURL="/id?123" showImage="true"/>
          </div>
          <div className="card-body">
            <p className="card-text">{state.comment}</p>
          </div>
        </div>
      </div>
=======
<div className="card">
  <h5 className="card-header" >
    <img src= {state.profPic} className="rounded-circle"  style={{width: 40}}></img> {state.name}</h5>
  <div className="card-body">
    
    <p className="card-text" ><p className="text-left">{state.comment}</p></p>
  </div>
</div>
</div>
>>>>>>> a960b512d97cea4718926191c684a31a5bb32dc1
    )

}

export default Comment;