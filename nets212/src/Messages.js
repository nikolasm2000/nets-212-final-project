import React, { useRef } from 'react'
import Message from './Message'
import $ from 'jquery'

var config = require('./Config.js')
class Messages extends React.Component {
    constructor(props){
        super(props)
        this.state={messages: [], socket: props.socket, ref: React.createRef(), id: this.props.id}
    }
    
    componentDidMount() {
        //Get messages from chat
        let request = $.post(config.serverUrl + '/chats/' + this.state.id + '/messages');
        request.done((result) => {
            result.Items.forEach(element => {
                element.user = element.PBuser;
            })
            var newMessages = this.state.messages.concat([result.items]);
            newMessages = newMessages.sort((a,b) => {return (a.createdAt > b.createdAt) ? 1 : -1});
            this.setState({messages: newMessages});
            this.state.ref.current.scrollIntoView()
        });

        this.state.socket.on("chat message", data => {
            var newMessages = this.state.messages.concat([data]);
            newMessages = newMessages.sort((a,b) => {return (a.createdAt > b.createdAt) ? 1 : -1});
            this.setState({messages: newMessages});
            this.state.ref.current.scrollIntoView()
        })
    }

    render() {
        const messages = this.state.messages.map((item) =>
        <Message key={item.createdAt} msg={item}/>
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