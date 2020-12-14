import React, {useState} from 'react'
import { Collapse } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import ReactDOM from 'react-dom'
import Comment from './Comment.js'
import CommentInput from './CommentInput.js'

function Comments(props) {
  const [open, setOpen] = useState(false);
  const [text , setText] = useState("Show comments...");

  //should pass in a commentID to each comment
  const posts = props.comments.map((comment) =>
        <Comment id={comment}/>
    );

    function clicked() {
      setOpen(!open);
      if(open) {
        setText("Show comments...");
      } else {
        setText("Hide comments...");
      }
    }
  return (
    <div>
    <div className="text-center">
      <Button
        onClick={clicked}
        aria-controls="example-collapse-text"
        aria-expanded={open}
        class="btn btn-secondary"
      >
        {text}
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




