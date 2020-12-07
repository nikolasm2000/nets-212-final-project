import React from 'react';
import Message from './Message'

class Messagetable extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render() {
        return(
            <div>
                <Message sent="false"/>
                <Message sent="true"/>
            </div>
        )
    }
}

export default Messagetable;