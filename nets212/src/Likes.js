import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'

var config = require('./Config.js')
//LIKEs COMPONENT only takes in 2 parameters: 1) number of likes. 2) whether liked.
class Likes extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.state = {liked: false, likes: undefined};
  }

  componentDidMount() {
    let request = $.post(config.serverUrl + '/posts/' + this.props.postid + '/numlikes');
    request.done((result) => {
      this.setState({likes: result.likes, liked: this.props.liked})
    })
  }

  onClick() {
    this.setState({liked : !this.state.liked, likes: !this.state.liked ? this.state.likes + 1 : this.state.likes - 1})
    let request = $.post(config.serverUrl + '/posts/' + this.props.postid + '/togglelike');
    request.done((result) => {
    })
  }

  render() {
    const liked = this.state.liked;
    let button;

    return (
      <button type="button" class={this.state.liked ? "btn btn-primary" : "btn btn-outline-primary"} onClick={this.onClick}>
        Likes: {this.state.likes}
      </button>
    );
  }
} export default Likes;
