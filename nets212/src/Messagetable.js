import React from 'react';
import Message from './Message'

class Messagetable extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render() {
        return(
            <div class="container">
                <div class="row">
                    <div class="col-sm">
                        <Message sent="false"/>
                        <br></br>
                    </div>
                    <div class="col-sm">
                        <Message sent="true"/>
                    </div>
                </div>

            </div>

        )

    }

}

export default Messagetable;