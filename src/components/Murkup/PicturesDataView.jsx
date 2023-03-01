import {
  GalleryItem,
  GalleryItemImage,
} from './PicturesDataView.styled';

export const PicturesDataView = ({ pictures, onModal }) => {
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
