import React, { Component } from 'react';
import { ImageGaleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGallery } from './ImageGallery.styled';
import { GetPictures } from 'components/Services/Api';
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

    if (prevName !== nextName) {
      this.setState({
        status: 'panding',
        pictures: [],
        page: 1,
        isLoading: false,
      });

      try {
        const pictures = await GetPictures(nextName, 1);

        this.setState({
          pictures: pictures.hits,
          status: 'resolve',
        });
        if (pictures.total === 0) {
          this.setState({ status: 'rejectedSearch' });
        }
      } catch (error) {
        this.setState({ status: 'rejected' });
      }
    }

    if (
      prevState.page !== this.state.page &&
      this.state.page !== 1
    ) {
      this.setState({
        isLoading: true,
      });

      try {
        const pictures = await GetPictures(
          nextName,
          this.state.page
        );

        this.setState(prevState => ({
          pictures: [
            ...prevState.pictures,
            ...pictures.hits,
          ],
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

    if (status === 'rejectedSearch') {
      return <h1>{searchQuery} is wrong search...</h1>;
    }

    if (status === 'rejected') {
      return <h1>Something wrong...</h1>;
    }

    return (
      <>
        {status === 'idle' && <div>Input Search Query</div>}
        {status === 'resolve' && (
          <>
            {' '}
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
      </>
    );
  }
}

ImageGalery.propTypes = {
  onModal: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
};
