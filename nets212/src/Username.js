import React, {useState} from 'react'

function Username(props) {
    return (
        <div>
            <a href={props.userURL}>{props.name}</a>
        </div>
    )
}
export default Username;