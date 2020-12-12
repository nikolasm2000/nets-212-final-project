import React, {useState} from 'react'
import './friendstyle.css';


class Notification extends React.Component {
    constructor(props) {
      super(props);
      this.handleDismiss = this.handleDismiss.bind(this);
    }

    handleDismiss() {

    }

    render() {
    
        return (
        <div class="container m-2 p-0 friend">
            <div class="row align-items-center justify-content-around m-0 p-0">
                <div class="col m-0 ml-2 p-0 pr-0 mr-0">
                    <div class="row p-0 m-0">
                        <p class="p-0 m-0">This is some notification text. Shiver me timbers </p>
                    </div>
                    <div class="row p-0 m-0">
                        <p class="card-text m-0 p-0"><small class="text-muted">3 mins ago</small></p>
                    </div>
                </div>

                <div class="col-2 p-0 m-0">
                    <button type="button" class="btn btn-sm btn-outline-danger p-0 pr-1 pl-1 m-0" onClick={this.handleDismiss}>
                        <svg width="2.5em" height="2.5em" viewBox="0 0 16 16" class="bi bi-x pt-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </button>
                </div>

            </div>

        </div>
        );
      }
}

export default Notification;

