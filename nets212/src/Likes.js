import React, {useState} from 'react'
import ReactDOM from 'react-dom'

//LIKEs COMPONENT only takes in 2 parameters: 1) number of likes. 2) whether liked.
class Likes extends React.Component {
  constructor(props) {
    super(props);
    this.handleLike = this.handleLike.bind(this);
    this.handleUnlike = this.handleUnlike.bind(this);
    this.state = {liked: this.props.likes};
    this.state = {likes: this.props.liked};
  }


  handleLike() {
	this.setState({liked: true});
	this.setState({likes: this.state.likes+1});
  }

  handleUnlike() {
	this.setState({liked: false});
	this.setState({likes: this.state.likes-1});
  }

  render() {
    const liked = this.state.liked;
    let button;

    if (liked) {
      button = <UnlikeButton onClick={this.handleUnlike} likes = {this.state.likes}/>;
    } else {
      button = <LikeButton onClick={this.handleLike} likes = {this.state.likes}/>;
    }

    return (
      <div>
        {button}
      </div>
    );
  }
} export default Likes;

function LikeButton(props) {
  return (
    <button type="button" class="btn btn-outline-primary" onClick={props.onClick}>
      Likes: {props.likes}
    </button>
  );
}

function UnlikeButton(props) {
  return (
    <button type="button" class="btn btn-primary" onClick={props.onClick}>
      Likes:  {props.likes}
    </button>
  );
}

