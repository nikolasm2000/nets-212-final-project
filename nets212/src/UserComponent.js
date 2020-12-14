import React, {useState} from 'react'
import { Button } from 'react-bootstrap'
import $ from 'jquery'
import moment from 'moment';

var config = require('./Config.js')

class UserComponent extends React.Component {

	constructor(props){
		super(props);
		this.state = {
        	name : "",
			affiliation : "",
			birthday : "",
			image: "https://pennbook.s3.amazonaws.com/Screen+Shot+2020-01-14+at+3.24.25+AM.png",
    	}
	}
	
	componentWillMount() {
		let request = $.post(config.serverUrl + '/user/' + this.props.id + '/get');
        request.done((result) =>  {
			console.log(result)
			this.setState({
				name: result.first_name + ' ' + result.last_name,
				affiliation: result.affiliation,
				birthday: moment.unix(result.birthday).format("MMMM Do, YYYY")
			});
        });

        request.fail((result) => {

        })
	}
	
	render(){
		return (
			<div class="m-0 mt-0 mb-2 bg-light">
					<div class="container">
						  <div class="row">
							<div class="col">
								  <div className="text-center " style={{paddingTop: 30}}>
									<img class="card-img-top img-fluid" src= {this.state.image} class="rounded-circle"  style={{maxWidth: 300}}></img>
								</div>
								</div>
						  </div>
						  <div class="row align-items-center">
							<div class="col">
								<h3 class="text-center lead" style={{paddingTop: 30}}>Affiliation: {this.state.affiliation} </h3>
								</div>
							<div class="col">
								<h1 class="text-center " style={{paddingTop: 15}}>{this.state.name} </h1>
							</div>
							<div class="col">
								  <h3 class="text-right lead" style={{paddingTop: 30}}>Birthday: {this.state.birthday} </h3>
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


}
export default UserComponent;