import React, {useState} from 'react'
import { Button } from 'react-bootstrap'


function Comment(props) {
    const [state , setState] = useState({
    name : props.comment.user.firstName + " " + props.comment.user.lastName,
    comment : props.comment.text,
    profPic: props.comment.user.profilePic,
    })

    return (
      <div style={{paddingTop: 20}}>
<div className="card">
  <h5 className="card-header" >
    <img src= {state.profPic} className="rounded-circle"  style={{width: 40}}></img> {state.name}</h5>
  <div className="card-body">
    
    <p className="card-text" ><p className="text-left">{state.comment}</p></p>
  </div>
</div>
</div>
    )

}

export default Comment;