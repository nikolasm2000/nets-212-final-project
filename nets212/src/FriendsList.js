import React, {useState} from 'react'
import Friend from './Friend.js';

function FriendsList(props) {
    return (
        <div class="card container-fluid p-0 m-0">
            <div class="container p-0 m-0">
                <div class="row">
                    <div class="col">
                        <div className="card-header pb-0 pl-2" style={{paddingTop: 10}}>
                            <h5 class="card-title"><b>Friends</b></h5>	
                        </div>
                    </div>
                </div>
                <div class="card-body p-0">
                    <Friend/>
                    <hr class="m-0 p-0"/>
                    <Friend/>
                    <hr class="m-0 p-0"/>
                    <Friend/>
                </div>
            </div>
        </div>
    );
}

export default FriendsList;