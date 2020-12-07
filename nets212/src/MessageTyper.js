import React from 'react'

class MessageTyper extends React.Component {
    constructor (props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <div className= "card fixed-bottom mx-auto" style={{maxWidth:"60%"}}>
                <div className="input-group">
                <input className ="form-control input-lg m-0 pb-0 pt-0" type = 'text' placeholder= "Type a message" id = "text"/> 
                <div className="input-group-append m-0">
                    <button className="btn btn-primary m-0" style={{width:85}}> Send </button>
                </div>
                </div>
            </div>


        )
    }
}

export default MessageTyper;