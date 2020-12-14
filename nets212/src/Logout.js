import React from 'react'

class Logout extends React.Component {
    constructor(props) {
        super(props)
        this.state={}
    }

    onClick() {
        var request = $.post(config.serverUrl + '/logout/');
            request.done((result) => {
                localStorage.removeItem(user);
                
            });
        }

    render() {
        return (
            <div>
                <button type="button" class="btn btn-info" onClick={this.onClick}>Logout </button>
            </div>
        )
    }
}

export default Logout;
