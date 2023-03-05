import {
  GalleryItem,
  GalleryItemImage,
} from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export const ImageGaleryItem = ({ pictures, onModal }) => {
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
};

ImageGaleryItem.propTypes = {
  pictures: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onModal: PropTypes.func.isRequired,
};
