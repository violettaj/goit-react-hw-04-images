import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem.js';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

export const ImageGallery = ({ images, handleShowModal }) => {
  return (
    <ul className={css.gallery}>
      {images &&
        images.map(img => {
          return (
            <ImageGalleryItem
              webformatURL={img.webformatURL}
              largeImageURL={img.largeImageURL}
              key={img.id}
              handleShowModal={handleShowModal}
            />
          );
        })}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  handleShowModal: PropTypes.func.isRequired,
};
