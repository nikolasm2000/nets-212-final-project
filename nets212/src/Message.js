import React from 'react'

//need to pass this a message ID. This component will then do the look up. Get the message text and date to display. 
//along with message ID, need to pass a prop of whether it was received or sent. 
    
    class Message extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render(){
        let card;
        if (this.props.sent === "true") {
            card =      <div className="card ml-auto border-0">
                            <div className="card text-right ml-auto" style={{backgroundColor:"#6fa0ed", borderRadius:"25px", paddingLeft:"15px", maxWidth:"400px"}}>
                                <div class="card-body p-2">
                                This is a sent messsage. Notice how this stacks. smelly vagina rocks
                                </div>
                            </div>
                            <div className="card text-right ml-auto border-0" style={{borderRadius:"15px", maxWidth:"200px"}}>
                                <div class="card-body p-0" style={{fontSize:"0.6em"}}>
                                Sent by __ on ___. 
                                </div>
                            </div>
                        </div>        
        } else {
            card = <div className="card border-0">
                <div className="card ml-auto" style={{backgroundColor:"#EEEEEE",borderRadius:"25px", paddingLeft:"15px", maxWidth:"400px"}}>
                    <div class="card-body p-2">
                    This is a received messsage. Notice how this stacks. blabj blak blak
                    </div>
                </div>
                <div className="card text-right ml-auto border-0" style={{borderRadius:"15px", maxWidth:"200px"}}>
                    <div class="card-body p-0" style={{fontSize:"0.6em"}}>
                    Sent by __ on ___. 
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