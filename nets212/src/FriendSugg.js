import React, {useState} from 'react'
import { Button } from 'react-bootstrap'


function FriendSugg(props) {
    const [state , setState] = useState({
        name1 : "Person1",
		pic1 : "https://pennbook.s3.amazonaws.com/Screen+Shot+2020-01-14+at+3.24.25+AM.png",
		name2 : "Person2",
		pic2 : "https://aws-logs-794770869316-us-east-1.s3.amazonaws.com/pic5.jpg",
		name3 : "Person3",
		pic3 : "https://aws-logs-794770869316-us-east-1.s3.amazonaws.com/pic3.jpg",
		name4 : "Person4",
		pic4 : "https://aws-logs-794770869316-us-east-1.s3.amazonaws.com/pic4.jpg",
		name5 : "Person5",
		pic5 : "https://aws-logs-794770869316-us-east-1.s3.amazonaws.com/pic2.jpeg",
    })

    return (
<div class="card" style={{width: 500}}>
		<div class="container">
  			<div class="row">
    			<div class="col">
      				<div className="text-left " style={{paddingTop: 10}}>
						<h5 class="card-title">Friend Suggestions</h5>
            			
        			</div>
   			 	</div>
  			</div>
  			<div class="row">
    			<div class="col">
      				<img class="card-img" src= {state.pic1} class="rounded-circle"  style={{width: 50}}></img>
   		 		</div>
    			<div class="col">
      				<img class="card-img" src= {state.pic2} class="rounded-circle"  style={{width: 50}}></img>
    			</div>
    			<div class="col">
      				<img class="card-img" src= {state.pic3} class="rounded-circle"  style={{width: 50}}></img>
    			</div>
				<div class="col">
      				<img class="card-img" src= {state.pic4} class="rounded-circle"  style={{width: 50}}></img>
    			</div>
				<div class="col">
      				<img class="card-img" src= {state.pic5} class="rounded-circle"  style={{width: 50}}></img>
    			</div>
  			</div>
			<div class="row">
    			<div class="col">
      				<p class="text-left">{state.name1} </p>
   		 		</div>
    			<div class="col">
      				<p class="text-left">{state.name2} </p>
    			</div>
    			<div class="col">
      				<p class="text-left">{state.name3} </p>
    			</div>
				<div class="col">
      				<p class="text-left">{state.name4} </p>
    			</div>
				<div class="col">
      				<p class="text-left">{state.name5} </p>
    			</div>
  			</div>
		</div>
	 </div>   
    )

}

export default FriendSugg;