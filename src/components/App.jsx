import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImages } from './Api/Api';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    images: [],
    topic: '',
    page: 1,
    totalHits: 500,
    perPage: 12,
    isLoading: false,
    error: null,
    showModal: false,
    largeImageURL: '',
  };

  loadGallery = async () => {
    this.setState({ isLoading: true });
    try {
      const { topic, page, perPage } = this.state;

      const response = await fetchImages(topic, page, perPage);

      this.setState(prevState => {
        return {
          images: [...prevState.images, ...response.hits],
          error: null,
          totalHits: response.totalHits,
        };
      });
    } catch (error) {
      this.setState({ error: error });
      throw new Error(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const value = e.target.search.value;
    console.log({ value });
    this.setState({ images: [], page: 1, topic: value });
  };

  handleMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.topic !== this.state.topic
    ) {
      this.loadGallery();
    }
  }

  handleShowModal = event => {
    const largeImageURL = event.target.srcset;
    this.setState({
      showModal: true,
      largeImageURL: largeImageURL,
    });
  };

  onModalClose = () => {
    this.setState({
      showModal: false,
      largeImageURL: '',
    });
  };
  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery
          images={this.state.images}
          handleShowModal={this.handleShowModal}
        />
        <Loader isLoading={this.state.isLoading} />
        {this.state.images.length > 0 &&
          this.state.page * this.state.perPage < this.state.totalHits && (
            <Button
              btnShow={this.state.isLoading ? 'Loading...' : 'Load More'}
              handleMore={this.handleMore}
            />
          )}
        {this.state.showModal && (
          <Modal
            largeImageURL={this.state.largeImageURL}
            onKeyPress={this.onKeyPress}
            onModalClose={this.onModalClose}
          />
        )}
      </div>
    );
  }
}
