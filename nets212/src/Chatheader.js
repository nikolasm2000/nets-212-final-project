import React from 'react'
import Username from './Username'
import Searcher from './Searcher'

class Chatheader extends React.Component {
    constructor (props) {
        super(props)
    }
    render () {
        return (
            <div className = "container pd-2 mt-2 mb-2">
                <div class = "border row boxlayour">
                    <div class = "border-0 col-md-3 mt-2 mb-2">
                        <Username firstName="Pranav" lastName="Aurora" showImage="true" userURL="user/123"/>
                    </div>
                    <div class = "border-0 col-md-3 mt-2 mb-2"> 
                    </div>
                    <div class = "border-0 col-md-3 mt-3" > 
                        <Searcher placeholder="users to chat"/>
                    </div>
                    <div class = "border-0 col-md-3 mt-3 mb-3 float-right"> 
                        <button type="button" class="btn btn-sm btn-outline-danger pr-3 pl-3" onClick={this.handleReject}>
                            Leave Chat
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}


export default Chatheader;