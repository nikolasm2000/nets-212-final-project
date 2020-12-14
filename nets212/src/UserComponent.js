import React, {useState} from 'react'
import { Button } from 'react-bootstrap'
import $ from 'jquery'
import moment from 'moment'
import ImageInput from './ImageInput.js'
import ReactS3 from 'react-s3'
import S3FileUpload from 'react-s3';

var config = require('./Config.js')

class UserComponent extends React.Component {

	constructor(props){
		super(props);
		this.state = {
        	name : "",
			affiliation : "",
			birthday : "",
			id: ""
    	}
	}
	
	componentWillMount() {
		let request = $.post(config.serverUrl + '/user/' + this.props.id + '/get');
        request.done((result) =>  {
			console.log(result)
			this.setState({
				id : result.id,
				name: result.first_name + ' ' + result.last_name,
				affiliation: result.affiliation,
				birthday: moment.unix(result.birthday).format("MMMM Do, YYYY")
			});
			if (result.profile_pic == undefined) {
				this.setState({image: "https://pennbook.s3.amazonaws.com/Screen+Shot+2020-01-14+at+3.24.25+AM.png"})
			} else {
				this.setState({
					image: result.profile_pic
				})
			}
        });
        request.fail((result) => {

        })
	}

	fileChange = e => {
        this.setState({uploading:true});
		S3FileUpload.uploadFile(e.target.files[0], config).then((data)=> { this.setState({pictures: [data.location], uploading:false })}).catch((err)=> {alert(err)})
		//need to post to the update route on the backend 
	}

	changeImageButton = e => {
		this.setState({displaychooser: "true"});
		
	}
	
	render(){
		return (
			<div class="m-0 mt-0 mb-2 bg-light">
					<div class="container">
						  <div class="row">
							<div class="col">
								  <div className="text-center " style={{paddingTop: 30}}>
									<img class="card-img-top img-fluid" src= {this.state.image} class="rounded-circle"  style={{maxWidth: 300}}></img>


									{this.state.id === localStorage.getItem('user') ? 
										<div className="custom-file mt-3">
											<button type="button mt-1 mb-1" class="btn btn-secondary" onClick={this.changeImageButton}> change profile picture </button>
											{this.state.displaychooser === "true" ?
												<input type="file" accept="image/x-png,image/gif,image/jpeg" onChange= {this.fileChange} />
												: <div> </div>
											}
										</div> : <div> </div>
									}

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