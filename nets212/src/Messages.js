import React, { useRef } from 'react'
import Message from './Message'

class Messages extends React.Component {
    constructor(props){
        super(props)
        this.state={messages: [], socket: props.socket, ref: React.createRef()}
    }
    
    componentDidMount() {
        this.state.socket.on("chat message", data => {
            var newMessages = this.state.messages.concat([data]);
            newMessages = newMessages.sort((a,b) => {return (a.createdAt > b.createdAt) ? 1 : -1});
            this.setState({messages: newMessages});
            this.state.ref.current.scrollIntoView()
        })
    }

    render() {
        const messages = this.state.messages.map((item) =>
        <Message key={item.timeStamp} msg={item}/>
        );
        return (
            <div className="container mt-2 mb-2" style={{maxHeight:"75%"}}>
                {messages}         
                <div ref={this.state.ref}></div>
            </div>
        )
    }
}

export default Messages;