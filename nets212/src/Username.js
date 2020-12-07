import React, {useState} from 'react'

function Username(props) {
    return (
        <div class="container p-0 m-0 d-flex flex-row align-items-center">
            {props.showImage === "true" ? <img className="rounded-circle p-0 m-0" src="https://pennbook.s3.amazonaws.com/Screen+Shot+2020-01-14+at+3.24.25+AM.png" style={{maxWidth:40}} /> : null}
            <a class="p-0 m-0 pl-2" href={props.userURL}>{props.firstName} {props.lastName}</a>
        </div>
    )
}
export default Username;