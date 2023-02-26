import PropTypes from 'prop-types';

export const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  handleShowModal,
}) => {
  return (
    <li>
      <img
        width="380px"
        src={webformatURL}
        srcSet={largeImageURL}
        alt=""
        onClick={handleShowModal}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  handleShowModal: PropTypes.func.isRequired,
};
