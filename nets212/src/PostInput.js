import React, { userRef } from 'react'


function PostInput() {

    const handleClick = e => {
        e.preventDefault();  
    };
    return (
        <form className = 'upload-steps' onSubmit = {handleClick}>
            <input className ="form-control input-lg" type = 'text' placeholder="what's on your mind?"/> 
            <div className="input-group mb-3">
                <div className="custom-file">
                    <input type="file" className="custom-file-input" id="inputGroupFile02"/>
                    <label className="custom-file-label" for="inputGroupFile02">choose image</label>
                </div>
                <div className="input-group-append">
                    <span className="input-group-text" id="">Upload</span>
                </div>
          </div>
        </form>
    );
}

export default PostInput;