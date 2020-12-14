import React, {useState} from 'react'
import Username from './Username.js'
import './friendstyle.css';


class Friend extends React.Component {
    constructor(props) {
      super(props);
      this.handleMessage = this.handleMessage.bind(this);
      this.handleRemoveFriend = this.handleRemoveFriend.bind(this);
    }

    handleMessage() {

    }

    handleRemoveFriend() {

    }

    render() {
    
        return (
        <div class="container p-2 friend m-0">
            <div class="row align-items-center justify-content-between">
                <div class="col-auto pr-0 mr-3 ml-3">
                    <Username id="123" firstName="Pranav" lastName="Aurora" userURL="/id?123" showImage="true"/>
                </div>

                <div class="col-auto p-0 m-0 mr-4">
                    <div class="row p-0 m-0 align-items-center justify-content-center">
                        <div class="col-auto p-0 m-0">                       
                            <button type="button" class="btn btn-sm btn-outline-primary p-0 pr-1 pl-1 mr-2" onClick={this.handleMessage}>
                                <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-chat-dots" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
                                    <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                </svg>
                            </button>
                        </div>
                        <div class="col-auto p-0 m-0">
                            <button type="button" class="btn btn-sm btn-outline-danger p-0 pr-1 pl-1" onClick={this.handleRemoveFriend}>
                                <div class="row align-items-end">
                                    <div class="col">
                                        <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-person-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M8 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10zm1.146-7.85a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708z"/>
                                        </svg>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
      }
}


export default Friend;

