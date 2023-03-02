import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export const Modal = () => {
  useEffect(() => {
    document.addEventListener('keydown', this.onKeyPress);
  }, []);
  const onKeyPress = e => {
    if (e.keyCode === 27) {
      handleCloseModal();
    }
  };
  const onOverlayClick = () => {
    handleCloseModal();
  };
  const handleCloseModal = () => {
    onModalClose();
    removeEventListener('keydown', onKeyPress);
  };
  return (
    <>
      <div id="overlay" className={css.overlay} onClick={onOverlayClick}></div>
      <div>
        <img className={css.modal} alt="" src={largeImageURL} />
      </div>
    </>
  );
};
Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
};
