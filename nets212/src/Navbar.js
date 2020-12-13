import React from 'react'
import { Navbar,Nav,Form, Button, NavDropdown } from 'react-bootstrap'
import Autosuggest from 'react-autosuggest'
import _default from 'react-bootstrap/esm/CardColumns';
import Username from './Username';
import Seacher from './Searcher';
import './autosuggest.css';
import './friendstyle.css';

const people = [ 
    {
        name: "Pranav Aurora", 
        userUrl: "user/123"
    },
    {
        name: "Pra", 
        userUrl: "user/126"
    },
    {
        name: "Pr", 
        userUrl: "user/127"
    },
    {
        name: "Pran", 
        userUrl: "user/128"
    },
    {   name: "Rafa Marquez", 
        userUrl: "user/124"
    },
    {   name: "henrique Lorente",
        userUrl: "user/125"
    },
        {name: "nico legend",
        userUrl: "user/126"
    }]


const getSuggestions = (value) => {
    const trimmedInput = value.trim().toLowerCase();
    const length = trimmedInput.length;
    let toR = [];
    if (length !== 0) {
         toR = people.filter(person => person.name.toLowerCase().slice(0,length) === trimmedInput);
    } 
    return toR;
}

const displaySuggestion = (suggestion) => suggestion.name;

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

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
    };

    onSuggestionFetch = ({value}) => {
        this.setState({
            suggestion : getSuggestions(value)
        });
    };

    onSuggestionsClear = () => {
        this.setState({
            suggestion : []
        });
    };

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
                <Seacher/>

            </Navbar>
        )
    } 
}
export default NavigationBar;