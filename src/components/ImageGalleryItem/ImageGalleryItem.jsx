import {
  GalleryItem,
  GalleryItemImage,
} from './ImageGalleryItem.styled';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

export const ImageGaleryItem = ({ pictures, onModal }) => {
  return pictures.map(({ webformatURL, largeImageURL }) => {
    return (
      <GalleryItem key={nanoid()}>
        <GalleryItemImage
          onClick={() => onModal(largeImageURL)}
          src={webformatURL}
          alt=""
        />
      </GalleryItem>
    );
  });
};

ImageGaleryItem.propTypes = {
  pictures: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onModal: PropTypes.func.isRequired,
};
