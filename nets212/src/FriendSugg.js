import React, { Component } from "react";
import Truncate from 'react-truncate'
import $ from 'jquery'
var config = require('./Config.js')

class FriendSugg extends Component {
  constructor() {
    super();
    this.state = {
     name1: "",
	 name2: "",
	 name3: "",
	 name4: "",
	 pic1: "",
	 pic2: "",
	 pic3: "",
	 pic4: "",
	 link1: "",
	 link2: "",
	 link3: "",
     link4: "",
    };
  }

  
  componentWillMount() {
    
	var request = $.post(config.serverUrl + '/affiliations/getaffiliates');
    request.done((result) => {

		var request2 = $.post(config.serverUrl + '/user/' + result[0] + '/get');
        request2.done((result2) => {
			this.setState({
				name1 : result2.first_name,
				pic1: result2.profile_pic,
				link1: '/user/' + result[0]
			});
	  });
	  
	  var request2 = $.post(config.serverUrl + '/user/' + result[1] + '/get');
        request2.done((result2) => {
			this.setState({
				name2 : result2.first_name,
				pic2: result2.profile_pic,
				link2: '/user/' + result[1]
			});
	  });
	  
	  var request2 = $.post(config.serverUrl + '/user/' + result[2] + '/get');
        request2.done((result2) => {
			this.setState({
				name3 : result2.first_name,
				pic3: result2.profile_pic,
				link3: '/user/' + result[2]
			});
	  });
	  
	  var request2 = $.post(config.serverUrl + '/user/' + result[3] + '/get');
        request2.done((result2) => {
			this.setState({
				name4 : result2.first_name,
				pic4: result2.profile_pic,
				link4: '/user/' + result[3]
			});
      });
	

    });

  }

  render() {
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
					<a href = {this.state.link1}>
      				<img className="card-img img-fluid" src= {this.state.pic1} className="rounded-circle"  style={{maxWidth: 50}} ></img>
					  </a>
   		 		</div>
    			<div className="col">
					<a href = {this.state.link2}>
      				<img className="card-img img-fluid" src= {this.state.pic2} className="rounded-circle"  style={{maxWidth: 50}}></img>
    			</a></div>
    			<div className="col">
					<a href = {this.state.link3}>
      				<img className="card-img img-fluid" src= {this.state.pic3} className="rounded-circle"  style={{maxWidth: 50}}></img>
    			</a></div>
				<div className="col">
					<a href = {this.state.link4}>
      				<img className="card-img img-fluid" src= {this.state.pic4} className="rounded-circle"  style={{maxWidth: 50}}></img>
    			</a></div>
  			</div>
			<div className="row pl-4 pr-4" >
    			<div className="col">
      				<p className="text-left" class="text-primary">
					<Truncate lines={1} ellipsis={<span>..</span>} width = {50}>
                		{this.state.name1}
            		</Truncate>
					</p>
   		 		</div>
    			<div className="col">
      				<p className="text-left" class="text-primary">
					<Truncate lines={1} ellipsis={<span>..</span>} width = {50}>
                		{this.state.name2}
            		</Truncate>
					</p>
    			</div>
    			<div className="col">
      				<p className="text-left" class="text-primary">
					<Truncate lines={1} ellipsis={<span>..</span>} width = {50}>
                		{this.state.name3}
            		</Truncate>
					</p>
    			</div>
				<div className="col">
      				<p className="text-left" class="text-primary">
					<Truncate lines={1} ellipsis={<span>..</span>} width = {55} >
						{this.state.name4}
            		</Truncate>
					</p>
    			</div>
  			</div>
		</div>
	 </div>   
    )
  }
}
export default FriendSugg