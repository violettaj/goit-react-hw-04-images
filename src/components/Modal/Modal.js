import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export const Modal = (onModalClose, largeImageURL) => {
  useEffect(() => {
    const onKeyPress = e => {
      if (e.keyCode === 27) {
        onModalClose();
      }
    };
    window.addEventListener('keydown', onKeyPress);
    return () => {
      window.removeEventListener('keydown', onKeyPress);
    };
  }, [onModalClose]);
  const onOverlayClick = evt => {
    if (evt.currentTarget === evt.target) {
      onModalClose();
    }
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
