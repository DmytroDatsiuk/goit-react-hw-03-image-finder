import React, { Component } from 'react';
import { ImageGaleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import {
  Descripton,
  ImageGallery,
} from './ImageGallery.styled';
import { GetPictures } from 'Services/Api';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import PropTypes from 'prop-types';

export class ImageGalery extends Component {
  state = {
    showModal: false,
    url: '',
    pictures: [],
    status: 'idle',
    page: 1,
    isLoading: false,
  };
  async componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.searchQuery;
    const nextName = this.props.searchQuery;
    const { page } = this.state;

    if (prevName !== nextName || prevState.page !== page) {
      try {
        const picturesData = await GetPictures(
          nextName,
          page
        );

        this.setState(({ pictures }) => ({
          pictures: [...pictures, ...picturesData.hits],
          status: 'resolve',
          isLoading: false,
        }));
      } catch (error) {
        this.setState({ status: 'rejected' });
      }
    }
  }

  handeleLoaderClick = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  render() {
    const { pictures, status, isLoading } = this.state;
    const { searchQuery, onModal } = this.props;
    console.log(pictures);

    return (
      <>
        {pictures.length !== 0 && (
          <>
            <ImageGallery>
              <ImageGaleryItem
                onModal={onModal}
                pictures={pictures}
              />
            </ImageGallery>
            {isLoading ? (
              <Loader />
            ) : (
              <Button onClick={this.handeleLoaderClick} />
            )}
          </>
        )}
        {status === 'panding' && <Loader />}
        {status === 'idle' && (
          <Descripton>Please Input Search Query</Descripton>
        )}
        {status === 'rejectedSearch' && (
          <Descripton>
            {searchQuery} is wrong search...
          </Descripton>
        )}

        {status === 'rejected' && (
          <Descripton>Something wrong...</Descripton>
        )}
      </>
    );
  }
}

ImageGalery.propTypes = {
  onModal: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
};
