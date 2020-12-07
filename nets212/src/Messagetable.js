import React from 'react';
import Messages from './Messages'
import Chatheader from './Chatheader'
import MessageTyper from './MessageTyper'

class Messagetable extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render() {
        return(
            <div className="container mb-10 p-40 w-75% max-auto">
                <Chatheader/>
                <div className="h-75 d-line block">
                    <Messages/>
                </div>
                <div className="d-line block">
                <MessageTyper/>
                </div>
            </div>
        )
    }
}

export default Messagetable;