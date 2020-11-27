import React, {useState} from 'react'

function UserPage(props) {
    const [state , setState] = useState({
        name : "Niko Mihailidis",
		affiliation : "UPenn",
		birthday : "Oct. 7, 2000",
		image: "https://pennbook.s3.amazonaws.com/Screen+Shot+2020-01-14+at+3.24.25+AM.png",
    })

    return (
<div class="card" style={{width: 1200}}>
		<div class="container">
  			<div class="row">
    			<div class="col">
      				<div className="text-center " style={{paddingTop: 30}}>
            			<img class="card-img-top" src= {state.image} class="rounded-circle"  style={{width: 400}}></img>
        			</div>
   			 	</div>
  			</div>
  			<div class="row">
    			<div class="col">
      				<h1 class="text-left" style={{paddingTop: 15}}>{state.name} </h1>
   		 		</div>
    			<div class="col">
      				<h3 class="text-center lead" style={{paddingTop: 30}}>Affiliation: {state.affiliation} </h3>
    			</div>
    			<div class="col">
      				<h3 class="text-right lead" style={{paddingTop: 30}}>Birthday: {state.birthday} </h3>
    			</div>
  			</div>
		</div>
	 </div>   
    )

}

export default UserPage;