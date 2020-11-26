import React, {useState} from 'react'
import { Navbar,Nav,NavDropdown,Form,FormControl,Button } from 'react-bootstrap'
import { useHistory } from "react-router-dom";


class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: ""};
    } 
    render () {
        return (
            <div>
                <Navbar bg="dark">
                    <Navbar.Brand href="#home">
                        PennBooks
                    </Navbar.Brand>
                </Navbar>
            </div>
        )
    } 
}
export default NavigationBar;