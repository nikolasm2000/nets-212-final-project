import React, {useState} from 'react'
import Username from './Username';
import Likes from './Likes';
import Comments from './Comments.js';
import moment from 'moment';
import $ from 'jquery'
var config = require('./Config.js')


//should just take in a POST ID. it will then make the call to the backend.
class NewsArticle extends React.Component {
    /*constructor(props) {
        super (props);
        this.state = {};
    }


    componentWillMount() {
        //this.refreshID = setInterval(() => this.refresh(), config.refreshTime);
        //Make call to backend to get POST details
        if (this.props.id) {
            var request = $.post(config.serverUrl + '/posts/' + this.props.id + '/get');
            request.done((result) => {
                this.setState({
                    //posted by
                    userID: result.author,
                    //optional, posted on whose wall
                    user2: result.wall,
                    //time posted
                    timeStamp: "Posted " + moment.unix(result.createdAt).fromNow(),
                    //URL of image
                    imageURL: result.pictures ? result.pictures[0] : '',
                    //text of the post
                    text: result.text,
                    //number of likes
                    numLikes: result.likes,
                    //whether userliked
                    liked: result.liked,
                    //list of comment IDs on the post
                    commentIDs: result.comments,
                });
                
            });
        }
    } */

    render () {
        return (
            <div class="card mt-4 mb-2 container-fluid p-0 m-0">
            <div class="card-header d-flex flex-row pb-2 align-items-start justify-content-between">
                <div class="card-title m-0 p-0 pb-1 row align-items-center"> 
                    <div class="col-auto m-0 p-0">
                    
                    <div class="container p-0 m-0 d-flex flex-row align-items-center">
                <div class="d-flex flex-column align-items-start pl-2 justify-content-center">
                    <a class="p-0 m-0" href= "https://www.google.com/">This is the article title.</a>
                    <small class= "text-muted m-0 p-0">Written by: your mom</small>
                </div>
            </div>

                    </div>
                    

                </div>
                <p class="card-text m-0 p-0"><small class="text-muted">Date publicshed: 2012</small></p>
            </div>
            <div class="card-body">
                <p class="card-text">This is a description of the article. This is a description of the article. This is a description of the article. This is a description of the article.
                This is a description of the article. This is a description of the article. This is a description of the article. 
                click the link for more</p>
                <hr/>
                <div class="row p-0 m-0 d-flex align-items-center">
                    <div class="col p-0 m-0">
                        <Likes number= {12} liked={true} postid={11}/>
                    </div>
                </div>
                <div class="row p-0 m-0 d-flex align-items-center">
                    <div class="col">
                        <Comments postid={11}/>
                    </div>
                </div>
            </div>
        </div>

        )
    }
}

export default NewsArticle;