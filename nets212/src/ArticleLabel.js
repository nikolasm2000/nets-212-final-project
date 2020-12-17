import React from 'react'
import $ from 'jquery';

var config = require('./Config.js')

class ArticleLabel extends React.Component {
    constructor(props) {
        super(props)
        this.state= {name: "", url: "", author: ""}
    }

    componentDidMount() {
        var request = $.post(config.serverUrl + '/articles/' + this.props.id + '/get');
        request.done((result) => {
            this.setState({
                name: result.headline,
                url: result.link,
                author: result.authors
            }); 
        });
    }

    render () {
        return(
            <div class="container p-0 m-0 d-flex flex-row align-items-center">     
                <div class="d-flex flex-column align-items-start pl-2 justify-content-center">
                    <a class="p-0 m-0" href={this.state.url}> {this.state.name} </a>
                    <small>{this.state.author}</small>
                </div>
            </div>
        )
    }
}

export default ArticleLabel;