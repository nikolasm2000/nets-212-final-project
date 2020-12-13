import React, {useState} from 'react'
import { Button } from 'react-bootstrap'


function UserComponent(props) {
    const [state , setState] = useState({
        name : "Niko Mihailidis",
		affiliation : "UPenn",
		birthday : "Oct. 7, 2000",
		image: "https://pennbook.s3.amazonaws.com/Screen+Shot+2020-01-14+at+3.24.25+AM.png",
    })

    return (
<div class="m-0 mt-0 mb-2 bg-light">
		<div class="container">
  			<div class="row">
    			<div class="col">
      				<div className="text-center " style={{paddingTop: 30}}>
            			<img class="card-img-top img-fluid" src= {state.image} class="rounded-circle"  style={{maxWidth: 300}}></img>
        			</div>
   			 	</div>
  			</div>
  			<div class="row align-items-center">
    			<div class="col">
					<h3 class="text-center lead" style={{paddingTop: 30}}>Affiliation: {state.affiliation} </h3>
   		 		</div>
    			<div class="col">
					<h1 class="text-center " style={{paddingTop: 15}}>{state.name} </h1>
    			</div>
    			<div class="col">
      				<h3 class="text-right lead" style={{paddingTop: 30}}>Birthday: {state.birthday} </h3>
    			</div>
  			</div>
			<div class="row align-items-center justify-content-center">
				<div class="col-auto">
					Information not accurate?<Button variant="link" href="/update"> Update your account here </Button>
				</div>
			</div>
			
		</div>
		<hr class="p-0 m-0"/>
	 </div>   
    )

}
export default UserComponent;