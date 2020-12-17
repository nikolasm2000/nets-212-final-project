import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import $ from 'jquery';

var config = require('./Config.js');

class PrivateRoute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {redirect: <div>Loading...</div>}
    }

    componentDidMount(){
        let request = $.post(config.serverUrl + '/authenticate');

        request.done((result) => {
            console.log("successful authentication");
            localStorage.setItem('user', result.id);
            this.setState({redirect: <Route pure path={this.props.path} component={this.props.component} exact={this.props.exact}/>});
        });

        request.fail((result) => {
            console.log("authentication failed");
            localStorage.removeItem('user');
            this.setState({redirect: <Redirect to='/'/>});
        });
    }
    
    render() {
        return this.state.redirect;
    }

}

export default PrivateRoute;