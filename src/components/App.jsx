import React, { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import fetchImages from './Api/Api';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [images, setImages] = useState([]);
  const [topic, setTopic] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  useEffect(() => {
    if (!topic) return;
    const loadGallery = async () => {
      try {
        const request = await fetchImages(topic, page);
        if (request.length === 0) {
          return setError(`No found ${topic}`);
        }
        setImages(prevImages => [...prevImages, ...request]);
      } catch (error) {
        setError('Oops! Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    loadGallery();
  }, [page, topic]);

  const handleSubmit = e => {
    e.preventDefault();
    const value = e.target.search.value;
    setTopic(value);
    setImages([]);
    setPage(1);
    setError(null);
    setIsLoading(true);
  };

  const handleMore = () => {
    setIsLoading(true);
    setPage(prevState => prevState + 1);
  };

  const handleShowModal = event => {
    setLargeImageURL(event.target.dataset.source);
    onModalClose(!isLoading);
  };
  const onModalClose = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <Searchbar onSubmit={handleSubmit} />
      {error}
      {images.length > 0 && !error && (
        <ImageGallery
          images={images}
          error={error}
          handleShowModal={handleShowModal}
        />
      )}
      {isLoading && <Loader />}

      {images.length >= 12 && !error && (
        <Button
          btnShow={isLoading ? 'Loading...' : 'Load More'}
          handleMore={handleMore}
        />
      )}
      {showModal && (
        <Modal largeImageURL={largeImageURL} onModalClose={onModalClose} />
      )}
    </div>
  );
};
