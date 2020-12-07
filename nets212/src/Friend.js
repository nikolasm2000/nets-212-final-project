import React, {useState} from 'react'
import Username from './Username.js'
import './friendstyle.css';


class Friend extends React.Component {
    constructor(props) {
      super(props);
      this.handleMessage = this.handleMessage.bind(this);
    }

    handleMessage() {

    }

    render() {
    
        return (
        <div class="container p-2 pl-3 friend m-0">
            <div class="row align-items-center justify-content-end">
                <div class="col pr-0 mr-0">
                    <Username firstName="Pranav" lastName="Aurora" userURL="/id?123" showImage="true"/>
                </div>

                <div class="col-3 p-0 m-0 mr-2">
                    <button type="button" class="btn btn-sm btn-outline-primary" onClick={this.handleMessage}>
                        Message
                    </button>
                </div>


            </div>
        </div>
        );
      }
}


export default Friend;

