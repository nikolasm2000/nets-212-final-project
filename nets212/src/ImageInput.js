import React from 'react';
import S3FileUpload from 'react-s3';

const config = {
      bucketName: 'pennbook',
      region: 'us-east-1',
      accessKeyId: 'AKIAID2TRJMEBXW4XKHQ',
      secretAccessKey: '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'
}

function ImageInput() {

	const upload = (e)=>{

		S3FileUpload.uploadFile(e.target.files[0], config).then((data)=> {console.log(data.location)}).catch((err)=> {alert(err)})

	}
    

    return (
        <div>
			<h3>Upload an image.</h3>
			<input type= 'file' onChange = {upload}/>

		</div>
            
    );
}

export default ImageInput;