import React from 'react';
import Autosuggest from 'react-autosuggest';
import { Navbar,Nav,Form, Button, NavDropdown } from 'react-bootstrap'
import Username from './Username';
import './autosuggest.css';
import $ from 'jquery';

var config = require('./Config.js')


//need to take a look at what this does. DON't NEED. 
const displaySuggestion = (suggestion) => suggestion.name;

const renderSuggest = suggestion => (
    <div>
        <Username id = {suggestion.id} showImage="true"/>
    </div>
);

class SearchingUser extends React.Component{
    constructor (props) {
        super(props);
        this.state = {suggestion: [], value: "", users:[]}
    };

    componentDidMount () {
        var request = $.post(config.serverUrl + '/table/user')
        request.done((result) => {
            console.log(result)
            this.setState({users: result.Items})
        })
    }


    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
    };

    onSuggestionFetch = ({value}) => {
        const trimmedInput = value.trim().toLowerCase();
        const length = trimmedInput.length;
        let toR = [];
        if (length !== 0) {
            console.log(this.state.users)
             toR = this.state.users.filter(person => 
                person.first_name ? person.first_name.toLowerCase().slice(0,length) === trimmedInput : 4);
        } 
        this.setState({
            suggestion: toR
        })
    };

    onSuggestionsClear = () => {
        this.setState({
            suggestion : [],
            value : ""
        });
    };


    onSuggestionSelected = (event, { suggestion, suggestionValue, index, method }) => {
        this.setState({ selectedURL: suggestion.userUrl})  
        console.log(this.state.selectedURL);     
    };
    render () {
        const { value, suggestion } = this.state; 
        var displayText = 'Search for users'

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

export default SearchingUser;