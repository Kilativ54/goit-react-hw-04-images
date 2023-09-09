import PropTypes from 'prop-types';
import { Component } from 'react';

import {
  Search,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    currentSearch: '',
  };

  onChange = evt => {
    this.setState({
      currentSearch: evt.currentTarget.value.toLowerCase().trim(),
    });
  };

  onSubmit = evt => {
    evt.preventDefault();
    this.props.onSubmit(this.state.currentSearch);
    this.setState({ currentSearch: '' });
    evt.currentTarget.reset();
  };

  render() {
    return (
      <Search>
        <SearchForm onSubmit={this.onSubmit}>
          <SearchFormButton type="submit">
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            name="search"
            type="text"
            onChange={this.onChange}
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Search>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
