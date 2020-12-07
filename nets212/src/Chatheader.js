import React from 'react'
import Username from './Username'

class Chatheader extends React.Component {
    constructor (props) {
        super(props)
    }
    render () {
        return (
            <div className="card mt-2">
                <div className = "card-header pl-3 pt-2">
                    <Username firstName="Pranav" lastName="Aurora" showImage="true" userURL="user/123"/>
                </div>
            </div>
        )
    }
}


export default Chatheader;