import React from 'react'

const message = [ 
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
            card = <div className="card text-right ml-auto" style={{backgroundColor:"#6fa0ed", borderRadius:"25px", paddingLeft:"15px", paddingBottom:"0px", maxWidth:"300px"}}>
                    <div class="card-body">
                        This is a sent messsage. Notice how this stacks.
                    </div>
                    </div>
        } else {
            card = <div className="card text-left" style={{borderRadius:"25px", paddingRight:"15px", backgroundColor:"#b5b7ba", maxWidth:"300px"}}>
                    <div class="card-body">
                        received message. So hi whats up. How are you. Blah blah blah
                    </div>
                </div>
        }
        return (
            <div className= "d-flex" style={{width:"600px"}}>
                {card}
            </div>

        )
    }

}
export default Message;