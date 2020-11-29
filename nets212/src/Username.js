import React, {useState} from 'react'

function Username(props) {
    return (
        <div>
            <a href={props.userURL}>{props.firstName} {props.lastName}</a>
        </div>
    )
}
export default Username;