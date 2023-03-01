import {
  GalleryItem,
  GalleryItemImage,
} from './PicturesDataView.styled';
import React, { Component } from 'react';

export class PicturesDataView extends Component {
  render() {
    const { pictures, onModal } = this.props;

    return pictures.map(
      ({ id, webformatURL, largeImageURL }) => {
        return (
          <GalleryItem key={id}>
            <GalleryItemImage
              onClick={() => onModal(largeImageURL)}
              src={webformatURL}
              alt=""
            />
          </GalleryItem>
        );
      }
    );
  }
}
