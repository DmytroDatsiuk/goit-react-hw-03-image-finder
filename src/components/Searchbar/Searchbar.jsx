import React, { Component } from 'react';
import {
  SearchBarHeader,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';
import { FcSearch } from 'react-icons/fc';
import { toast } from 'react-toastify';

export class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleSearchQueryChange = e => {
    this.setState({
      searchQuery: e.currentTarget.value.toLowerCase(),
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.searchQuery.trim() === '') {
      toast.warn('Input search query');
      return;
    }

    this.props.onSearch(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    const { searchQuery } = this.state;
    const { handleSubmit, handleSearchQueryChange } = this;
    return (
      <SearchBarHeader>
        <SearchForm onSubmit={handleSubmit}>
          <SearchFormButton type="submit">
            <FcSearch />
            <SearchFormButtonLabel>
              Search
            </SearchFormButtonLabel>
          </SearchFormButton>
          <SearchFormInput
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchQuery}
            onChange={handleSearchQueryChange}
          />
        </SearchForm>
      </SearchBarHeader>
    );
  }
}
