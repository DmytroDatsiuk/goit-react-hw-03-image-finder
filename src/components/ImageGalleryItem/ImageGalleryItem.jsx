import React, { Component } from 'react';
import axios from 'axios';
import { PicturesDataView } from 'components/Murkup/PicturesDataView';

export class ImageGaleryItem extends Component {
  state = {
    pictures: [],
    status: 'idle',
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.searchQuery;
    const nextName = this.props.searchQuery;

    const params = {
      key: '32602095-27dbade4d0732e174c3b141f5',
      q: nextName,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 12,
      page: 1,
    };

    if (prevName !== nextName) {
      this.setState({ status: 'panding', pictures: [] });

      try {
        const response = await axios.get(
          'https://pixabay.com/api/',
          { params }
        );

        this.setState({
          pictures: response.data.hits,
          status: 'resolve',
        });
        if (response.data.total === 0) {
          this.setState({ status: 'rejectedSearch' });
        }
      } catch (error) {
        this.setState({ status: 'rejected' });
      }
    }
  }

  render() {
    const { pictures, status } = this.state;
    const { onModal, searchQuery } = this.props;

    if (status === 'idle') {
      return <div>Input Search Query</div>;
    }

    if (status === 'panding') {
      return <p>Loading...</p>;
    }

    if (status === 'rejectedSearch') {
      return <h1>{searchQuery} is wrong search...</h1>;
    }

    if (status === 'rejected') {
      return <h1>Something wrong...</h1>;
    }

    if (status === 'resolve') {
      return (
        <PicturesDataView
          pictures={pictures}
          onModal={onModal}
        />
      );
    }
  }
}
