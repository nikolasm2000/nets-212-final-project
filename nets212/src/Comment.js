import React, {useState} from 'react'
import { Button } from 'react-bootstrap'


function Comment(props) {
    const [state , setState] = useState({
        name : "Niko Mihailidis",
		comment : "This is a comment",
    })

    return (
<div className="card">
  <h5 className="card-header">{state.name}</h5>
  <div className="card-body">
    
    <p className="card-text">{state.comment}</p>
  </div>
</div>
    )

}

export default Comment;