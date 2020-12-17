import React, {useState} from 'react'
import Post from './Post.js'
import PostInput from './PostInput.js'
import $ from 'jquery'

var config = require('./Config.js')

//newsfeed should just be passed a userID. this should query the posts/homepage

//take in a prop - whether WALL(person) or homepage(landing page: /home)
class Newsfeed extends React.Component {
    constructor(props) {
        super(props)
        this.state = { posts: []}
        this.handleScroll = this.handleScroll.bind(this);
    }

    addPost = (post) => {
        console.log(post);
        this.setState({
            posts: [post].concat(this.state.posts)
        });
    }

    componentDidMount() {
        //this.refreshID = setInterval(() => this.refresh(), config.refreshTime);
        //Make call to backend to get POST details
        window.addEventListener("scroll", this.handleScroll);
        //TWO SEPARATE CALLS
        if (this.props.id) {
            var request = $.post(config.serverUrl + '/posts/wall/' +  this.props.id);
            request.done((result) => {
                this.setState ({
                    posts: result
                });
            });
        } else {
            var request = $.post(config.serverUrl + '/posts/homepage');
            request.done((result) => {
                this.setState({ 
                    posts: result
                });
            });

        }
    }
    
    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll() {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = html.scrollHeight;
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight) {
            alert("bottom reached")
        } else {
            this.setState({
                message: 'not at bottom'
            });
        }
    }
    //need to iteate over the set postIDs and call each post then. 

    render () {
        const posts = this.state.posts.map((post) => {
            return <Post key={post} id={post}/>
        });

        return (
            <div>
                <PostInput addPost={this.addPost} id={this.props.id}/>
                <hr class="mt-4 mb-0 p-0"/>
                <div class="d-flex flex-column align-items-center">
                    {posts}
                </div>
                <br/>
            </div>
        )
    }


 }

// function Newsfeed(props) {
//     //This will produce all the posts that were passed in from an array to newsfeed..
//     //post should just be passed an ID
//     const posts = props.posts.map((post) =>
//         <Post id={post}/>
//     );
//     return (
//         <div>
//             <PostInput user={props.user}/>
//             <hr class="mt-4 mb-0 p-0"/>
//             <div class="d-flex flex-column align-items-center">
//                 {posts}
//             </div>
//             <br/>
//         </div>
//     )
// }

export default Newsfeed;