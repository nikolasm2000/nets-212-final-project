import React from 'react';
import Messages from './Messages'
import Chatheader from './Chatheader'
import MessageTyper from './MessageTyper'
import './column.css';

class Messagetable extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render() {
        return(
            <div className="container mb-10 p-40 w-75% max-auto">
                <div class="row">
                    <div class="col">
                        <Chatheader/>
                    </div>
                </div>
                <div class="row">
                    <div class="col col-scroll col-scroll-messages">
                        <Messages/>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <MessageTyper/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Messagetable;