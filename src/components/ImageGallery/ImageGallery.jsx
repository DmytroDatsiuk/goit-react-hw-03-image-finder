import { ImageGaleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGallery } from './ImageGallery.styled';

export const ImageGalery = ({ onModal, searchQuery }) => {
  return (
    <ImageGallery>
      <ImageGaleryItem
        onModal={onModal}
        searchQuery={searchQuery}
      />
    </ImageGallery>
  );
};
