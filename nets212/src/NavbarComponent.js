import React from 'react'
import { Navbar,Nav,Form, Button, NavDropdown } from 'react-bootstrap'
import _default from 'react-bootstrap/esm/CardColumns';
import Username from './Username';
import Searcher from './Searcher';
import SearchingUser from './SearchingUser';
import './autosuggest.css';
import './friendstyle.css';
import Logout from './Logout';
class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    } 
    
    render () {
        return (
            <Navbar bg="dark" expand="lg" variant="dark" sticky="top">
                <Navbar.Brand href="/home">PennBooks</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/graph">Visualizer</Nav.Link>
                    <Username id= {localStorage.getItem('user')} showImage="true"/>
                 </Nav>
                </Navbar.Collapse>
                <SearchingUser/>
                <Searcher placeholder="users"/>
                <Logout/>
            </Navbar>
        )
    } 
}
export default NavigationBar;