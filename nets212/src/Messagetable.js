import React from 'react';
import Message from './Message'
import Username from './Username'

class Messagetable extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render() {
        return(
            <div>
                <Username firstName="Pranav" lastName="Aurora" userURL="user/123" showImage="true"/>
                <br></br>
                <Message sent="false"/>
                <Message sent="true"/>
            </div>
        )
    }
}

export default Messagetable;