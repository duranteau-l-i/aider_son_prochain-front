import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import Autosuggest from 'react-autosuggest';
import axios from 'axios';

import './suggest.scss';

class Suggest extends React.Component {
  constructor(props) {
    super(props);

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: [],
      beneficiariesByName: [],
    };
  }

  // Teach Autosuggest how to calculate suggestions for any given input value.
  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : this.state.suggestions.filter(
          beneficiary => beneficiary.username.toLowerCase().slice(0, inputLength) === inputValue,
        );
  };

  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  getSuggestionValue = suggestion => suggestion.username;

  // Use your imagination to render suggestions.
  renderSuggestion = suggestion => (
    <div id={suggestion._id} data-name={suggestion.username}>
      {suggestion.username}
    </div>
  );

  onChange = (event, { newValue }) => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL_DEV}/${this.props.role}/search-beneficiary/?q=${newValue}`,
        {
          headers: {
            Authorization: `Bearer ${this.props.token}`,
            'Content-Type': 'application/json',
          },
        },
      )
      .then(response => {
        this.setState({
          suggestions: response.data.result,
        });
      })
      .catch(e => {
        console.log(e);
      });
    this.setState({
      value: newValue,
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value),
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
    this.props.searchBeneficiaryClear(this.state.value);
  };

  onSuggestionSelected = (
    event,
    { suggestion, suggestionValue, suggestionIndex, sectionIndex, method },
  ) => {
    event.preventDefault();
    // console.log(suggestion, suggestionValue, suggestionIndex, sectionIndex, method);
    this.setState({
      suggestions: [],
      beneficiariesByName: [],
    });
    this.props.handleBeneficiarySelect(suggestion);
  };

  render() {
    const { value, suggestions } = this.state;
    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Entrez un nom',
      value,
      onChange: this.onChange,
      onBlur: this.props.searchBeneficiaryBlur,
    };

    // Finally, render it!
    return (
      <>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
          onSuggestionSelected={this.onSuggestionSelected}
        />
      </>
    );
  }
}

export default Suggest;
