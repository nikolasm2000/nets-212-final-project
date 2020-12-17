import React, {useState} from 'react'
import Truncate from 'react-truncate'

function FriendSugg(props) {
    const [state , setState] = useState({
        name1 : "Nikolas Mihailidis",
		pic1 : "https://pennbook.s3.amazonaws.com/default-profile.jpg",
		name2 : "Pranav Aurora",
		pic2 : "https://pennbook.s3.amazonaws.com/default-profile.jpg",
		name3 : "Rafael Marques",
		pic3 : "https://pennbook.s3.amazonaws.com/default-profile.jpg",
		name4 : "Henrique Lorente",
		pic4 : "https://pennbook.s3.amazonaws.com/default-profile.jpg",
		userUrl: "/id?123"
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
					<a href = {state.userUrl}>
      				<img className="card-img img-fluid" src= {state.pic1} className="rounded-circle"  style={{maxWidth: 50}} ></img>
					  </a>
   		 		</div>
    			<div className="col">
					<a href = {state.userUrl}>
      				<img className="card-img img-fluid" src= {state.pic2} className="rounded-circle"  style={{maxWidth: 50}}></img>
    			</a></div>
    			<div className="col">
					<a href = {state.userUrl}>
      				<img className="card-img img-fluid" src= {state.pic3} className="rounded-circle"  style={{maxWidth: 50}}></img>
    			</a></div>
				<div className="col">
					<a href = {state.userUrl}>
      				<img className="card-img img-fluid" src= {state.pic4} className="rounded-circle"  style={{maxWidth: 50}}></img>
    			</a></div>
  			</div>
			<div className="row pl-4 pr-4" >
    			<div className="col">
      				<p className="text-left" class="text-primary">
					<Truncate lines={1} ellipsis={<span>..</span>} width = {50}>
                		{state.name1}
            		</Truncate>
					</p>
   		 		</div>
    			<div className="col">
      				<p className="text-left" class="text-primary">
					<Truncate lines={1} ellipsis={<span>..</span>} width = {50}>
                		{state.name2}
            		</Truncate>
					</p>
    			</div>
    			<div className="col">
      				<p className="text-left" class="text-primary">
					<Truncate lines={1} ellipsis={<span>..</span>} width = {50}>
                		{state.name3}
            		</Truncate>
					</p>
    			</div>
				<div className="col">
      				<p className="text-left" class="text-primary">
					<Truncate lines={1} ellipsis={<span>..</span>} width = {55} >
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

