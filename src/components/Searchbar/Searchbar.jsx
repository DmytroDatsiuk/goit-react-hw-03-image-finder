import React, { Component } from 'react';
import {
  SearchBarHeader,
  Form,
  SearchFormButton,
  SearchFormButtonLabel,
  Field,
} from './Searchbar.styled';
import { FcSearch } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { Formik } from 'formik';
import PropTypes from 'prop-types';

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
        <Formik initialValues={{ search: '' }}>
          <Form onSubmit={handleSubmit}>
            <SearchFormButton type="submit">
              <FcSearch />
              <SearchFormButtonLabel>
                Search
              </SearchFormButtonLabel>
            </SearchFormButton>
            <Field
              type="text"
              name="search"
              autoFocus
              placeholder="Search images and photos"
              value={searchQuery}
              onChange={handleSearchQueryChange}
            />
          </Form>
        </Formik>
      </SearchBarHeader>
    );
  }
}

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
