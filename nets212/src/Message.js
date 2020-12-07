import React from 'react'

const people = [ 
    {
        messageID:100, 
    }];
    
    class Message extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render(){
        let card;
        if (this.props.sent === "true") {
            card = <div className="card text-right ml-auto p-2" style={{backgroundColor:"#6fa0ed", borderRadius:"25px", paddingLeft:"15px", paddingBottom:"0px", width:"300px"}}>
                    <div class="card-body">
                        sent message.
                    </div>
                    </div>
        } else {
            card = <div className="card text-left p-2" style={{borderRadius:"25px", paddingRight:"15px", backgroundColor:"#b5b7ba", width:"300px"}}>
                    <div class="card-body">
                        received message
                    </div>
                </div>
        }
        return (
            <div className= "d-flex" style={{backgroundColor: "#cdcfd1", width:"600px"}}>
                {card}
            </div>

        )
    }

}
export default Message;