import React, {useState} from 'react'
import Username from './Username';

function Post(props) {
    return (
        <div>
            <table>
                <tr>
                    <td><Username name="Test" userURL="/test"/></td>
                </tr>
                <tr>
                    <td><p>{props.text}</p></td>
                </tr>
                <tr>
                    <td><img src={props.imageURL}/></td>
                </tr>
                <tr>
                    <p>Likes: {props.likes}</p>
                </tr>
            </table>
        </div>
    )
}

export default Post;