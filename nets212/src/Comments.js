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
  var comments = props.comments;

  function addComment(comment) {
    comments.push(comment);
    if (open) {
      setOpen(!open)
      setOpen(open)
    } else {
      clicked()
    }
  }

  var posts;
  if (comments != null) {
      posts = comments.map((comment) =>
      <Comment id={comment}/>

    )} else {
      posts = <div> No comments yet :( </div>
    } 

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
    <CommentInput addComment={addComment}/>
    </div>
  );
} 
export default Comments;

