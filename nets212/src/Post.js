import React, {useState} from 'react'
import Username from './Username';
import Likes from './Likes';
import Comments from './Comments.js';
import $ from 'jquery'
var config = require('./Config.js')
const comments = [{text:"Damn I look good in this!", user:{firstName:"Pranav", lastName:"Aurora", userURL:"id=?2131", profilePic: "https://scontent.ffxe1-1.fna.fbcdn.net/v/t1.0-9/55817175_1278692865621197_1432642661486952448_n.jpg?_nc_cat=109&ccb=2&_nc_sid=a4a2d7&_nc_ohc=5yGvxbSXra8AX-nMbDB&_nc_ht=scontent.ffxe1-1.fna&oh=1e14b237408342c652ac4f440691df0e&oe=5FE99984"} }, 
  {text:"Wow! I need this officer to arrest me...", user:{firstName:"Stacy", lastName:"K.", userURL:"id=?2231", profilePic: "https://aws-logs-794770869316-us-east-1.s3.amazonaws.com/pic5.jpg"} },
{text:"Real cute fella this guy", user:{firstName:"Stan", lastName:"Smith", userURL:"id=?133", profilePic: "https://aws-logs-794770869316-us-east-1.s3.amazonaws.com/pic3.jpg"} },
{text:"Can you do it for $5?", user:{firstName:"Terrence", lastName:"T.", userURL:"id=?19", profilePic: "https://aws-logs-794770869316-us-east-1.s3.amazonaws.com/pic4.jpg"} }];


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
                console.log(result);
                this.setState({
                    //posted by
                    userID: result.author,
                    //optional, posted on whose wall
                    user2: result.wall,
                    //time posted
                    timeStamp: result.created_on,
                    //URL of image
                    imageURL: result.pictures ? result.pictures[0] : '',
                    //text of the post
                    text: result.text,
                    //number of likes
                    numLikes: result.likes,
                    //whether userliked
                    liked: result.liked,
                    //list of comment IDs on the post
                    commentIDs: result.commentIDs,
                });
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
                <p class="card-text m-0 p-0"><small class="text-muted">Posted 3 mins ago</small></p>
            </div>
            <div class="card-body">
                <p class="card-text">{this.state.text}</p>
                {this.state.imageURL ? <div> <hr/> <div class="d-flex flex-column align-items-center"> <img class="img-fluid" src={this.state.imageURL}/> </div> </div>: null}
                <hr/>
                <div class="row p-0 m-0 d-flex align-items-center">
                    <div class="col p-0 m-0">
                        <Likes number={this.state.numLikes} liked={this.state.liked} postid={this.props.id}/>
                    </div>
                </div>
                <div class="row p-0 m-0 d-flex align-items-center">
                    <div class="col">
                        
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