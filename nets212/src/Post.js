import React, {useState} from 'react'
import Username from './Username';
import Likes from './Likes';
import Comments from './Comments.js';
import moment from 'moment';
import Loader from 'react-loader-spinner'
import $ from 'jquery';
var config = require('./Config.js')



//should just take in a POST ID. it will then make the call to the backend.
class Post extends React.Component {
    constructor(props) {
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
                    user2: (result.author === result.wall) ? undefined : result.wall,
                    //time posted
                    timeStamp: "Posted " + moment.unix(result.createdAt).fromNow(),
                    //URL of image
                    imageURL: result.pictures ? result.pictures[0] : '',
                    //text of the post
                    text: result.text,
                    //number of likes
                    numLikes: result.likes,
                    //whether userliked
                    liked: result.has_liked,
                    //list of comment IDs on the post
                    commentIDs: result.comments,
                });
                this.props.setOldest(result.createdAt);
            });
        }
    }

    render () {
        var username;
        if(this.state.userID) {
            username = <Username id={this.state.userID} showImage="true"/>;
        }
        return (
            <div class="card mt-4 mb-2 container-fluid p-0 m-0">
            <div class="card-header d-flex flex-row pb-2 align-items-start justify-content-between">
                <div class="card-title m-0 p-0 pb-1 row align-items-center"> 
                    <div class="col-auto m-0 p-0">
                    {username}
                    </div>
                    {this.state.user2 ? <div class="col-auto m-0 pr-3 pl-3 text-secondary"> 
                        <svg xmlns="http://www.w3.org/2000/svg" width="2.5em" height="2.5em" fill="currentColor" class="bi bi-arrow-right-short p-0 m-0" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
                        </svg>
                    </div> : null}

                    {this.state.user2 ? <div class="col-auto m-0 p-0"> 
                    <Username id={this.state.user2} showImage="true"/> 
                    </div>: null}
                </div>
                <p class="card-text m-0 p-0"><small class="text-muted">{this.state.timeStamp}</small></p>
            </div>
            <div class="card-body">
                <p class="card-text">{this.state.text ? this.state.text : <Loader type="ThreeDots" color="#00BFFF" height={30} width={30} />}</p>
                {this.state.imageURL ? <div> <hr/> <div class="d-flex flex-column align-items-center"> <img class="img-fluid" src={this.state.imageURL}/> </div> </div>: null}
                <hr/>
                <div class="row p-0 m-0 d-flex align-items-center">
                    <div class="col p-0 m-0">
                        <Likes number={this.state.numLikes} liked={this.state.liked} postid={this.props.id}/>
                    </div>
                </div>
                <div class="row p-0 m-0 d-flex align-items-center">
                    <div class="col">
                        <Comments comments = {this.state.commentIDs} postid={this.props.id}/>
                    </div>
                </div>
            </div>
        </div>

        )
    }
}


// function Post(props) {
//     return (
//         <div class="card mt-4 mb-2 container-fluid p-0 m-0">
//             <div class="card-header d-flex flex-row pb-2 align-items-start justify-content-between">
//                 <div class="card-title m-0 p-0 pb-1 row align-items-center"> 
//                     <div class="col-auto m-0 p-0">
//                     <Username firstName={props.post.user.firstName} lastName={props.post.user.lastName} userURL={props.post.user.userURL} showImage="true"/>
//                     </div>
//                     {props.post.user2 ? <div class="col-auto m-0 pr-3 pl-3 text-secondary"> 
//                         <svg xmlns="http://www.w3.org/2000/svg" width="2.5em" height="2.5em" fill="currentColor" class="bi bi-arrow-right-short p-0 m-0" viewBox="0 0 16 16">
//                             <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
//                         </svg>
//                     </div> : null}

//                     {props.post.user2 ? <div class="col-auto m-0 p-0"> 
//                     <Username firstName={props.post.user2.firstName} lastName={props.post.user2.lastName} userURL={props.post.user2.userURL} showImage="true"/> 
//                     </div>: null}
//                 </div>
//                 <p class="card-text m-0 p-0"><small class="text-muted">Posted 3 mins ago</small></p>
//             </div>
//             <div class="card-body">
//                 <p class="card-text">{props.post.text}</p>
//                 {props.post.imageURL ? <div> <hr/> <div class="d-flex flex-column align-items-center"> <img class="img-fluid" src={props.post.imageURL}/> </div> </div>: null}
//                 <hr/>
//                 <div class="row p-0 m-0 d-flex align-items-center">
//                     <div class="col p-0 m-0">
//                         <Likes/>
//                     </div>
//                 </div>
//                 <div class="row p-0 m-0 d-flex align-items-center">
//                     <div class="col">
//                         <Comments className="ml-3" comments = {comments} />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

export default Post;