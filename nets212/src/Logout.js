import React from 'react'
import $ from 'jquery'
import { useHistory } from "react-router-dom";
var config = require('./Config.js')


function Logout(props) {
    const history = useHistory();

    const onClick = () => {

        var request = $.post(config.serverUrl + '/logout');
            request.done((result) => {
                console.log("local storage is " + localStorage.getItem('user'))
                localStorage.removeItem('user');
                console.log("local storage is after " + localStorage.getItem('user'))
                history.push('/')
            });
        }

        return (
            <div class="ml-2">
                <button type="button" class="btn btn-info mt-1 mb-1" onClick={onClick}>Logout </button>
            </div>
        )
    
}

export default Logout;
