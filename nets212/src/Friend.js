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
        <div class="container p-2 pl-4 friend m-0">
            <div class="row align-items-center justify-content-end">
                <div class="col pr-0 mr-0">
                    <Username firstName="Pranav" lastName="Aurora" userURL="/id?123" showImage="true"/>
                </div>

                <div class="col-4 p-0 m-0 mr-2">
                    <button type="button" class="btn btn-sm btn-outline-primary" onClick={this.handleMessage}>
                    <div class="row align-items-center justify-content-center pr-4 pl-2">
                        <div class="col p-0 m-0">
                            Message
                        </div>
                        <div class="col-2 p-0 m-0">
                            <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-chat-dots" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
                                <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                            </svg>
                        </div>
                    </div>
                    </button>
                </div>


            </div>
        </div>
        );
      }
}


export default Friend;

