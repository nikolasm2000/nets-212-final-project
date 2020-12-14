import React, {useState} from 'react'
import { Button } from 'react-bootstrap'
import $ from 'jquery'
import moment from 'moment'
import ImageInput from './ImageInput.js'
import ReactS3 from 'react-s3'
import S3FileUpload from 'react-s3';

var Config = require('./Config.js')

const config = {
    bucketName: 'pennbook',
    region: 'us-east-1',
    accessKeyId: 'AKIAID2TRJMEBXW4XKHQ',
    secretAccessKey: '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'
}


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
		let request = $.post(Config.serverUrl + '/user/' + this.props.id + '/get');
        request.done((result) =>  {
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
        if(!e.target.files[0]) return;
        this.setState({uploading:true, imageUploadText: "Uploading " + e.target.files[0].name + "...", errorMessage:""});
		S3FileUpload.uploadFile(e.target.files[0], config).then((data)=> { this.setState({image: data.location, uploading:false, imageUploadText: e.target.files[0].name }); e.target.value = null}).catch((err)=> {alert(err)})

		let update = {
			profile_pic: this.state.image
		}
		let request1 = $.post(Config.serverUrl + '/user/' + this.state.id + "/update", update);
			request1.done((result) => {

			});
			request1.fail((result) => {
				this.setState({error: "there was an error changing profile picture"})
			})

		let post = {
			text: this.state.name + " just changed their profile picture!",
			pictures: [this.state.image],
			author: localStorage.getItem('user'),
			privacy: 0,
			parent: "0",
		};
		let request = $.post(Config.serverUrl + '/posts/create', post);
            request.done((result) => {

			});
			request.fail((result) => {
				this.setState({error: "there was an error changing profile picture"})
			})
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
									<img class="card-img-top img-fluid" src= {this.state.image} class="rounded-circle"  style={{width: 300, height:300}}></img>


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