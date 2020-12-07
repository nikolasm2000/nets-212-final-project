import React, {useState} from 'react'
import ReactDOM from 'react-dom'
class Likes extends React.Component {
  constructor(props) {
    super(props);
    this.handleLike = this.handleLike.bind(this);
    this.handleUnlike = this.handleUnlike.bind(this);
	this.state = {liked: false};
	this.state = {likes: 9};
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

