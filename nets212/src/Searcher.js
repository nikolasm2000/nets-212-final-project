import React from 'react';
import Autosuggest from 'react-autosuggest';
import { Navbar,Nav,Form, Button, NavDropdown } from 'react-bootstrap'
import Username from './Username';
import articleName from './articleName';
import './autosuggest.css';
import $ from 'jquery';

var config = require('./Config.js')



//need to take a look at what this does. DON't NEED. 
const displaySuggestion = (suggestion) => suggestion.name;

const renderSuggest = suggestion => (
    suggestion.article != undefined ? 
    <div> 
        {suggestion.id}
    </div> :
    <div>
        <Username id = {suggestion.id} showImage="true"/>
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
        console.log("value searched is" + value.trim().toLowerCase());
    
        let send = {keyword: value};
        var request = $.post(config.serverUrl + '/search', send);
        request.done((result) => {
            console.log(result);
            this.setState({suggestion: result})
        })
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
        var displayText = 'Search for articles'

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