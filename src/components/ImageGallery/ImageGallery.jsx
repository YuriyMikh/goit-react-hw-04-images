import PropTypes from 'prop-types';
import { GalleryImageItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { StyledUl } from './ImageGallery.styled';

export const ImageGallery = ({ images }) => {
  return (
    <StyledUl>
      {images.map(item => (
        <GalleryImageItem key={item.id} item={item} /> //в GalleryImageItem передаем пропсом все экземпляры item, там они будут обрабатываться
      ))}
    </StyledUl>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
}