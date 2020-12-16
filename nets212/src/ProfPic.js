import React from 'react'


function ProfPic(props) {

    return (
        <div className= "d-flex">
            <img className="rounded-circle p-0 m-0" src= {props.picture} style={{maxWidth:40, maxHeight:40}} /> 
        </div>

    )
}
export default ProfPic;