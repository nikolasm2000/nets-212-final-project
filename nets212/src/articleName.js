import React from 'react'
import $ from 'jquery';

var config = require('./Config.js')

class articleName extends React.Component {
    constructor(props) {
        super(props)
        this.state= {name: "", url: "", author: ""}
    }

    componentDidMount() {
        var request = $.post(config.serverUrl + '/article/' + this.props.id + '/get');
        request.done((result) => {
            this.setState({
                name: result.name,
                url: result.url,
                author: result.author
            }); 
        });
    }

    render () {
        return(
            <div class="container p-0 m-0 d-flex flex-row align-items-center">     
                <div class="d-flex flex-column align-items-start pl-2 justify-content-center">
                    <a class="p-0 m-0" href={this.state.userURL}> {this.state.name} </a>
                    <small>{this.state.author}</small>
                </div>
            </div>
        )
    }
}

export default articleName;