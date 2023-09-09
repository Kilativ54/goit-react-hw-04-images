import PropTypes from 'prop-types';
import { useState } from 'react';

import {
  Search,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

export default function Searchbar({ onSubmit }) {
  const [currentSearch, SetCurrentSearch] = useState('');

  const onChange = evt => {
    SetCurrentSearch(evt.currentTarget.value.toLowerCase().trim());
  };

  const handleOnSubmit = evt => {
    evt.preventDefault();
    onSubmit(currentSearch);
    SetCurrentSearch('');
    evt.currentTarget.reset();
  };

  return (
    <Search>
      <SearchForm onSubmit={handleOnSubmit}>
        <SearchFormButton type="submit">
          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
        </SearchFormButton>
        <SearchFormInput
          name="search"
          type="text"
          onChange={onChange}
          placeholder="Search images and photos"
        />
      </SearchForm>
    </Search>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
