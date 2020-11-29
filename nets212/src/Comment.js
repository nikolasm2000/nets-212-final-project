import React, {useState} from 'react'
import { Button } from 'react-bootstrap'


function Comment(props) {
    const [state , setState] = useState({
        name : "Niko Mihailidis",
		comment : "This is a comment",
    })

    return (
<div class="card">
  <h5 class="card-header">{state.name}</h5>
  <div class="card-body">
    
    <p class="card-text">{state.comment}</p>
  </div>
</div>
    )

}

export default Comment;