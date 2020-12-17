import React, {useState} from 'react'
import Post from './Post.js'
import PostInput from './PostInput.js'
import NewsArticle from './NewsArticle.js'
import $ from 'jquery'

var config = require('./Config.js')

//newsfeed should just be passed a userID. this should query the posts/homepage

//take in a prop - whether WALL(person) or homepage(landing page: /home)
class Newsfeed extends React.Component {
    constructor(props) {
        super(props)
        this.state = { posts: [], oldestTimestamp:undefined, article: []}
        this.handleScroll = this.handleScroll.bind(this);
    }

    addPost = (post) => {
        console.log(post);
        this.setState({
            posts: [post].concat(this.state.posts)
        });
    }

    setOldest = (timeStamp) => {
        if(this.state.oldestTimestamp == undefined) {
            this.setState({oldestTimestamp: timeStamp});
        }
        else if (timeStamp < this.state.oldestTimestamp) {
            this.setState({oldestTimestamp: timeStamp});
        }
    }

    componentDidMount() {
        //this.refreshID = setInterval(() => this.refresh(), config.refreshTime);
        //Make call to backend to get POST details
        window.addEventListener("scroll", this.handleScroll);
        var url = config.serverUrl;
        //TWO SEPARATE CALLS
        if (this.props.id) {
            url += '/posts/wall/' +  this.props.id;
        } else {
            url += '/posts/homepage';
        }

        var request = $.post(url, {oldest: this.state.oldestTimestamp});
        request.done((result) => {
            this.setState ({
                posts: result
            }); 
        });

        var request2 = $.post(config.serverUrl + '/articles');
        request2.done((result) => {
            this.setState ({
                article: result
            }); 
        });        
    }
    
    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll() {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight) {
            console.log(this.state.oldestTimestamp)
            var url = config.serverUrl;
            //TWO SEPARATE CALLS
            if (this.props.id) {
                url += '/posts/wall/' +  this.props.id;
            } else {
                url += '/posts/homepage';
            }

            var request = $.post(url, {oldest: this.state.oldestTimestamp});
            request.done((result) => {
            this.setState ({
                posts: this.state.posts.concat(result)
            }); 
        });
        } else {
            this.setState({
                message: 'not at bottom'
            });
        }
    }
    //need to iteate over the set postIDs and call each post then. 

    render () {
        const posts = this.state.posts.map((post) => {
            return <Post key={post} id={post} setOldest={this.setOldest}/>
        });

         const articles = this.state.article.map((article) => {
             return <NewsArticle key={article} id={article}/>
         })

        return (
            <div>
                <PostInput addPost={this.addPost} id={this.props.id}/>
                <hr class="mt-4 mb-0 p-0"/>
                <div class="d-flex flex-column align-items-center">
                    {articles}
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