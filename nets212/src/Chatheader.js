import React from 'react'
import Username from './Username'

class Chatheader extends React.Component {
    constructor (props) {
        super(props)
        this.state = {status: "Online"}
    }
    render () {
        return (
            <div className="card sticky-top">
                <div className = "card-title m-10" style={{paddingTop:"10px"}}>
                    <Username firstName="Pranav" lastName="Aurora" showImage="true" userURL="user/123"/>
                    <small class={(this.state.status === "Online") ? "text-success" : "text-muted"}>{this.state.status}</small>
                </div>
            </div>
        )
    }
}


export default Chatheader;