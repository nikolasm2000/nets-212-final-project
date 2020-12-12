import React, {useState} from 'react'
import './friendstyle.css';
import Username from './Username.js'

class FriendRequest extends React.Component {
    constructor(props) {
      super(props);
      this.handleAccept = this.handleAccept.bind(this);
      this.handleReject = this.handleReject.bind(this);
    }

    handleAccept() {

    }

    handleReject() {

    }

    render() {
    
        return (
        <div class="container p-2 friend pl-1">
            <div class="row align-items-center justify-content-between m-0 p-0">
                <div class="col-auto pr-0 mr-0 m-0 p-0 ml-2">
                    <div class="row align-items-center p-0 m-0">
                        <Username firstName="Pranav" lastName="Aurora" userURL="/id?123" showImage="true"/>
                    </div>
                    <div classs="row align-items-center p-0 m-0">
                        <p class="card-text m-0 p-0"><small class="text-muted">Added you as a friend</small></p>
                    </div>
                </div>

                <div class="col-auto p-0 m-0">
                    <div class="row align-items-center justify-content-center m-0 p-0"> 
                        <div class="col-auto p-0 mr-2">
                            <button type="button" class="btn btn-sm btn-outline-success p-0 pr-1 pl-1" onClick={this.handleAccept}>
                                <svg width="2.5em" height="2.5em" viewBox="0 0 16 16" class="bi bi-person-check" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M8 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10zm4.854-7.85a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                                </svg>
                            </button>
                        </div>
                        <div class="col-auto p-0 m-0">
                            <button type="button" class="btn btn-sm btn-outline-danger p-0 pr-1 pl-1" onClick={this.handleReject}>
                                <svg width="2.5em" height="2.5em" viewBox="0 0 16 16" class="bi bi-person-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M8 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10zm1.146-7.85a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        );
      }
}

export default FriendRequest;

