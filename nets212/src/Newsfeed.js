import React, {useState} from 'react'
import Post from './Post.js'
import PostInput from './PostInput.js'


//newsfeed should just be passed a userID. this should query the posts/homepage

//take in a prop - whether WALL(person) or homepage(landing page: /home)
class Newsfeed extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        this.refreshID = setInterval(() => this.refresh(), config.refreshTime);
        //Make call to backend to get POST details

        //for wall. 
        if (this____) {
            var request = $.post(config.serverUrl + '/posts/wall/' + this.props.id );
            request.done((result) => {
                this.setState = {
                    //will just get a set of Post IDs. 
                    postIDs: _____
                }
            });
        }

        //for homepage
        if (this____) {
            var request = $.post(config.serverUrl + '/posts/homepage');
            request.done((result) => {
                this.setState = {
                    //will just get a set of Post IDs. 
                    postIDs: _____
                }
            });
        }


    }
    

    //need to iteate over the set postIDs and call each post then. 

    render () {
        return (
            <div>
                <PostInput user={props.user}/>
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