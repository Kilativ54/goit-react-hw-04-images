import PropTypes from 'prop-types';
import {
  ImageGalleryItemSt,
  ImageGalleryItemImageSt,
} from './ImageGalleryItem.styled';

export function ImageGalleryItem({ image, openModal }) {
  const { id, webformatURL } = image;

  return (
    <ImageGalleryItemSt id={id} className="gallery-item">
      <ImageGalleryItemImageSt
        src={webformatURL}
        alt=""
        onClick={() => {
          openModal(id);
        }}
      />
    </ImageGalleryItemSt>
  );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
  }).isRequired,
  openModal: PropTypes.func.isRequired,
};
