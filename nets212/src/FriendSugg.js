import React, {useState} from 'react'
import Truncate from 'react-truncate'

function FriendSugg(props) {
    const [state , setState] = useState({
        name1 : "Nikolas Mihailidis",
		pic1 : "https://pennbook.s3.amazonaws.com/Screen+Shot+2020-01-14+at+3.24.25+AM.png",
		name2 : "Pranav Aurora",
		pic2 : "https://aws-logs-794770869316-us-east-1.s3.amazonaws.com/pic5.jpg",
		name3 : "Rafael Marques",
		pic3 : "https://aws-logs-794770869316-us-east-1.s3.amazonaws.com/pic3.jpg",
		name4 : "Henrique Lorente",
		pic4 : "https://aws-logs-794770869316-us-east-1.s3.amazonaws.com/pic4.jpg",
	})
	

    return (
<div class="card container-fluid p-0 m-0" >
		<div class="container p-0 m-0">
  			<div class="row">
    			<div class="col">
      				<div className="card-header pb-0 pl-2" style={{paddingTop: 10}}>
						<h5 class="card-title"><b>Friend Suggestions</b></h5>	
        			</div>
   			 	</div>
  			</div>
  			<div className="row pt-2 pl-3">
    			<div className="col">
      				<img className="card-img img-fluid" src= {state.pic1} className="rounded-circle"  style={{maxWidth: 50}}></img>
   		 		</div>
    			<div className="col">
      				<img className="card-img img-fluid" src= {state.pic2} className="rounded-circle"  style={{maxWidth: 50}}></img>
    			</div>
    			<div className="col">
      				<img className="card-img img-fluid" src= {state.pic3} className="rounded-circle"  style={{maxWidth: 50}}></img>
    			</div>
				<div className="col">
      				<img className="card-img img-fluid" src= {state.pic4} className="rounded-circle"  style={{maxWidth: 50}}></img>
    			</div>
  			</div>
			<div className="row pl-4 pr-4">
    			<div className="col">
      				<p className="text-left">
					<Truncate lines={1} ellipsis={<span>..</span>} width = {50}>
                		{state.name1}
            		</Truncate>
					</p>
   		 		</div>
    			<div className="col">
      				<p className="text-left">
					<Truncate lines={1} ellipsis={<span>..</span>} width = {50}>
                		{state.name2}
            		</Truncate>
					</p>
    			</div>
    			<div className="col">
      				<p className="text-left">
					<Truncate lines={1} ellipsis={<span>..</span>} width = {50}>
                		{state.name3}
            		</Truncate>
					</p>
    			</div>
				<div className="col">
      				<p className="text-left">
					<Truncate lines={1} ellipsis={<span>..</span>} width = {50}>
                		{state.name4}
            		</Truncate>
					</p>
    			</div>
  			</div>
		</div>
	 </div>   
    )

}


export default FriendSugg;

