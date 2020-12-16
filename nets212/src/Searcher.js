import React from 'react';
import Autosuggest from 'react-autosuggest';
import { Navbar,Nav,Form, Button, NavDropdown } from 'react-bootstrap'
import Username from './Username';
import './autosuggest.css';

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

class Searcher extends React.Component{
    constructor (props) {
        super(props);
        this.state = {suggestion: [], value: "", placeholder: this.props.placeholder}
    };

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
            suggestion : [],
            value : ""
        });
    };

    onSuggestionSelected = (event, { suggestion, suggestionValue, index, method }) => {
        if (this.props.chat === "true") {
            //need different functionality for adding users to the chat"
        }
        this.setState({ selectedURL: suggestion.userUrl})  
        console.log(this.state.selectedURL);     
    };
    render () {
        const { value, suggestion } = this.state; 
        var displayText = 'Search for ' + this.state.placeholder

        const inputProps = {
            placeholder: displayText,
            value: this.state.value, 
            onChange: this.onChange
        };
        return (
        <Form inline>
            <Autosuggest
                suggestions={this.state.suggestion}
                onSuggestionsFetchRequested={this.onSuggestionFetch}
                onSuggestionsClearRequested={this.onSuggestionsClear}
                getSuggestionValue={displaySuggestion}
                renderSuggestion={renderSuggest}
                inputProps={inputProps}
                onSuggestionSelected={this.onSuggestionSelected}
            />
        </Form>
        )
    }
    
}

export default Searcher;