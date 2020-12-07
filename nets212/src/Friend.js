import React, {useState} from 'react'
import Username from './Username.js'
import './friendstyle.css';

function Friend(props) {
    return (
         <div class="container p-2 friend m-0">
            <div class="row">
                <div class="col-4 pr-0 mr-0">
                    <Username firstName="Pranav" lastName="Aurora" userURL="/id?123"/>
                </div>
                <div class="col pl-0 ml-0">
                    <p class="card-text"><small class="text-muted">Online</small></p>
                </div>
                <div class="col">
                    <button type="button" class="btn btn-sm btn-outline-primary ml-4">
                        Message
                    </button>
                </div>


            </div>
        </div>
    );
}

export default Friend;