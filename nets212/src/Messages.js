import React from 'react'
import Message from './Message'

class Messages extends React.Component {
    constructor(props){
        super(props)
        this.state={}
    }
    render() {
        const message = [
            {
                id: 123, 
                sent: "true"
            }, 
            {
                id: 124,
            },
            {
                id: 125,
                sent: "true"
            },
            {
                id: 125,
            },
            {
                id: 125,
                sent: "true"
            },
            {
                id: 125,
            },
            {
                id: 125,
                sent: "true"
            },
            {
                id: 125,
            },
            {
                id: 125,
                sent: "true"
            },
            {
                id: 125,
            },
            {
                id: 125,
                sent: "true"
            },
            {
                id: 125,
            },
            {
                id: 125,
            },
            {
                id: 125,
            }
        ];
        const messages = message.map((item) =>
        <Message sent={item.sent} />
        );
        return (
            <div className="container mt-2 mb-2" style={{maxHeight:"75%"}}>
                {messages}
            </div>
        )
    }
}

export default Messages;