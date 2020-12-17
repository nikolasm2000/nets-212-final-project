import React from 'react'
import moment from 'moment'
//need to pass this a message ID. This component will then do the look up. Get the message text and date to display. 
//along with message ID, need to pass a prop of whether it was received or sent. 
    
    class Message extends React.Component {
    constructor(props) {
        super(props)
        this.state = {id: this.props.msg.id, message: this.props.msg.message, user: this.props.msg.user, name: this.props.msg.name, timestamp: moment(this.props.msg.createdAt).fromNow()}
    }
    render(){
        let card;
        if (localStorage.getItem('user') === this.state.user) {
            card =      <div className="card ml-auto border-0">
                            <div className="card text-left ml-auto pr-2 pl-2" style={{backgroundColor:"#6fa0ed", borderRadius:"25px", paddingLeft:"0px", maxWidth:"400px"}}>
                                <div class="card-body p-2">
                                {this.state.message}
                                </div>
                            </div>
                            <div className="card text-right ml-auto border-0" style={{borderRadius:"15px", maxWidth:"200px"}}>
                                <div class="card-body p-0" style={{fontSize:"0.6em"}}>
                                Sent by {this.state.name} on {this.state.timestamp}. 
                                </div>
                            </div>
                        </div>        
        } else {
            card = <div className="card border-0">
                <div className="card ml-auto pr-2 pl-2" style={{backgroundColor:"#EEEEEE",borderRadius:"25px", paddingLeft:"0px", maxWidth:"400px"}}>
                    <div class="card-body p-2">
                    {this.state.message}
                    </div>
                </div>
                <div className="card text-right ml-auto border-0" style={{borderRadius:"15px", maxWidth:"200px"}}>
                    <div class="card-body p-0" style={{fontSize:"0.6em"}}>
                    Sent by {this.state.name} on {this.state.createdAt}. 
                    </div>
                </div>
        </div>

        }
        return (
            <div className= "d-flex">
                {card}
            </div>

        )
    }

}
export default Message;