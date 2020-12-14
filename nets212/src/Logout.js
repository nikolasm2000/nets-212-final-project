import React from 'react'
import $ from 'jquery'
import { Link } from 'react-router-dom'
var config = require('./Config.js')


class Logout extends React.Component {
    constructor(props) {
        super(props)
        this.state={}
    }

    onClick() {
        var request = $.post(config.serverUrl + '/logout');
            request.done((result) => {
                alert("check")
                console.log("local storage is " + localStorage.getItem('user'))
                localStorage.removeItem('user');
                console.log("local storage is after " + localStorage.getItem('user'))
            });
        }

    render() {
        return (
            <div>
                <Link to ='/' >
                    <button type="button" class="btn btn-info mt-1 mb-1" onClick={this.onClick}>Logout </button>
                </Link>
            </div>
        )
    }
}

export default Logout;
