import PropTypes from 'prop-types';
import React, { Component } from 'react';
import css from './Modal.module.css';

export class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.onKeyPress);
  }

  onKeyPress = e => {
    if (e.keyCode === 27) {
      this.handleCloseModal();
    }
  };

  onOverlayClick = () => {
    this.handleCloseModal();
  };

  handleCloseModal = () => {
    this.props.onModalClose();
    document.removeEventListener('keydown', this.onKeyPress);
  };
  render() {
    const { largeImageURL } = this.props;

    return (
      <>
        <div
          id="overlay"
          className={css.overlay}
          onClick={this.onOverlayClick}
        ></div>
        <div>
          <img className={css.modal} alt="" src={largeImageURL} />
        </div>
      </>
    );
  }
}

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
};
