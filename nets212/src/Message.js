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
        return (
            <div>
                <div className="card text-right" style={{backgroundColor:"#6fa0ed", borderRadius:"25px", paddingLeft:"15px" }}>
                    <div class="card-body">
                        sent message.
                    </div>
                </div>
                <div className="card text-left" style={{borderRadius:"25px", paddingRight:"15px"}}>
                    <div class="card-body">
                        received message
                    </div>
                </div>
            </div>
        )
    }

}
export default Message;