import React from 'react'
import moment from 'moment'

class MessageTyper extends React.Component {
    constructor (props) {
        super(props)
        this.state = {socket: props.socket, text:"", id: this.props.id}
        this.sendMessage = this.sendMessage.bind(this);
        this.onChange = this.onChange.bind(this);
    }


    sendMessage(e) {
        e.preventDefault();
        if(!/\S/.test(this.state.text)) return;
        this.setState({text:""});
        this.state.socket.emit("chat message", {
            user: localStorage.getItem('user'),
            chat: this.state.id,
            message: this.state.text

        })
    }

    onChange(e) {
        this.setState({text: e.target.value})
    }

    render() {
        return (
            <div className= "card mx-auto mt-2" style={{maxWidth:"60%"}}>
                <form onSubmit={this.sendMessage}>
                    <div className="input-group">
                    <input className ="form-control input-lg m-0 pb-0 pt-0" type = 'text' placeholder= "Type a message" id = "text" value = {this.state.text} onChange={this.onChange}/> 
                    <div className="input-group-append m-0">
                        <button type="submit" className="btn btn-primary m-0" style={{width:85}}> Send </button>
                    </div>
                    </div>
                </form>
            </div>


        )
    }
}

export default MessageTyper;