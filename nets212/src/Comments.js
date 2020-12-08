import React, {useState} from 'react'
import { Collapse } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import ReactDOM from 'react-dom'
import Comment from './Comment.js'
import CommentInput from './CommentInput.js'

function Comments(props) {
  const [open, setOpen] = useState(false);

  const posts = props.comments.map((comment) =>
        <Comment comment={comment}/>
    );

  return (
    <div>
    <div className="text-center">
      <Button
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
        class="btn btn-secondary"
      >
        Show comments...
      </Button>
      <Collapse in={open}>
        <div id="example-collapse-text">
          {posts}
        </div>
      </Collapse>
    </div>
    <CommentInput/>
    </div>
  );
} export default Comments;




