import React, { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImages } from './Api/Api';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [images, setImages] = useState([]);
  const [topic, setTopic] = useState('');
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(500);
  const [perPage, setPerPage] = useState(12);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [ShowModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');

  const loadGallery = async () => {
    setIsLoading(true);
    try {
      const response = await fetchImages(topic, page, perPage);
      setImages(prevState => [...prevState, ...response.hits]);

      setTotalHits(response);
    } catch (error) {
      setError(error);
      throw new Error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const value = e.target.search.value;
    setImages([]);
    setPage(1);
    setTopic(value);
  };

  const handleMore = () => {
    setPage(prevState => [prevState + 1]);
  };

  const handleShowModal = event => {
    const largeImageURL = event.target.srcset;
    setShowModal(true);
    setLargeImageURL(largeImageURL);
  };
  const onModalClose = () => {
    setShowModal(false);
    setLargeImageURL('');
  };

  useEffect(() => {
    loadGallery();
  }, [page, topic]);

  return (
    <div>
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery images={images} handleShowModal={handleShowModal} />
      <Loader isLoading={isLoading} />
      {images.length > 0 && page * perPage < totalHits && (
        <Button
          btnShow={isLoading ? 'Loading...' : 'Load More'}
          handleMore={handleMore}
        />
      )}
      {showModal && (
        <Modal
          largeImageURL={largeImageURL}
          onKeyPress={onKeyPress}
          onModalClose={onModalClose}
        />
      )}
    </div>
  );
};
