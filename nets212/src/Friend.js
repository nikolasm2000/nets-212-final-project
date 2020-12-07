import React, {useState} from 'react'
import Username from './Username.js'

function Friend(props) {
    return (
         <div class="container pt-5 m-0">
            <div class="d-flex flex-row">
                <Username firstName="Pranav" lastName="Aurora" userURL="/id?123"/>
            </div>
        </div>
    );
}

export default Friend;