import React from 'react'
import { Navbar,Nav,Form, Button, NavDropdown } from 'react-bootstrap'
import Autosuggest from 'react-autosuggest'
import _default from 'react-bootstrap/esm/CardColumns';
import Username from './Username';
import Searcher from './Searcher';
import './autosuggest.css';
import './friendstyle.css';
import Logout from './Logout';

const renderSuggest = suggestion => (
    <div>
        <Username firstName = {suggestion.name} userURL = {suggestion.userUrl} showImage="true"/>
    </div>
);

class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: "", url: "/user/" + this.props.id, value: '', suggestion: [], selectedURL: "", Redirect: null};
    } 

    onSuggestionSelected = (event, { suggestion, suggestionValue, index, method }) => {
        this.setState({ selectedURL: suggestion.userUrl})  
        console.log(this.state.selectedURL);     
    }
    
    render () {
        const { value, suggestion } = this.state;

        const inputProps = {
            placeholder: 'Search for users',
            value, 
            onChange: this.onChange
        };

        return (
            <Navbar bg="dark" expand="lg" variant="dark" sticky="top">
                <Navbar.Brand href="/home">PennBooks</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/messages">Messages</Nav.Link>
                    <Nav.Link href={this.state.url}> {this.props.name}</Nav.Link>

                 </Nav>
                </Navbar.Collapse>
                <Searcher/>
                <Logout/>
            </Navbar>
        )
    } 
}
export default NavigationBar;