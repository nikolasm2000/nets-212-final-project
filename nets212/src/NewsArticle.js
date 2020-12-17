import React, {useState} from 'react'
import Username from './Username';
import Likes from './Likes';
import Comments from './Comments.js';
import moment from 'moment';
import $ from 'jquery'
var config = require('./Config.js')


//should just take in a POST ID. it will then make the call to the backend.
class NewsArticle extends React.Component {
    constructor(props) {
        super (props);
        this.state = {};
    }


    componentWillMount() {
        //this.refreshID = setInterval(() => this.refresh(), config.refreshTime);
        //Make call to backend to get POST details
        if (this.props.id) {
            var request = $.post(config.serverUrl + '/articles/' + this.props.id + '/get');
            request.done((result) => {
                this.setState({
                    //posted by
                    articleID: result.articleID,
                    //optional, posted on whose wall
                    headline: result.headline,
                    //time posted
                    articledate: "Posted on " +  result.articleDate,
                    //URL of image
                    link: result.link,
                    //text of the post
                    authors: result.authors.split(" ")[0],
                    //list of comment IDs on the post
                    short_description: result.short_description,
                });
                
            });
        }
    } 

    render () {
        return (
            <div class="card mt-4 mb-2 container-fluid p-0 m-0">
            <div class="card-header d-flex flex-row pb-2 align-items-start justify-content-between">
                <div class="card-title m-0 p-0 pb-1 row align-items-center"> 
                    <div class="col-auto m-0 p-0">
                    
                    <div class="container p-0 m-0 d-flex flex-row align-items-center">
                <div class="d-flex flex-column align-items-start pl-2 justify-content-center">
                    <a class="p-0 m-0" href= {this.state.link}>{this.state.headline}.</a>
                    <small class= "text-muted m-0 p-0">Written by: {this.state.authors}</small>
                </div>
            </div>

                    </div>
                    

                </div>
                <p class="card-text m-0 p-0"><small class="text-muted">{this.state.articledate}</small></p>
            </div>
            <div class="card-body">
                <p class="card-text">{this.state.short_description}</p>
                <hr/>
                <div class="row p-0 m-0 d-flex align-items-center">
                    <div class="col p-0 m-0">
                        <Likes liked={false} postid={this.state.articleID}/>
                    </div>
                </div>
            </div>
        </div>

        )
    }
}

export default NewsArticle;