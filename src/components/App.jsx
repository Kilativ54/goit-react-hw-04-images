import React from 'react';
import { Component } from 'react';

import { Container } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchImages } from 'helpers/pictures';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import Modal from './Modal/Modal';

export class App extends Component {
  state = {
    images: [],
    pageNr: 1,
    currentSearch: '',
    totalPages: 0,
    isLoading: false,
    modalOpen: false,
    modalImg: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.pageNr !== prevState.pageNr ||
      this.state.currentSearch !== prevState.currentSearch
    ) {
      this.fetchImageToArray(prevState);
    }
  }

  toggleModal = () => {
    this.setState(({ modalOpen }) => ({ modalOpen: !modalOpen }));
  };

  openModal = id => {
    this.setState({ isLoading: true });
    const largeImage = this.state.images.find(image => image.id === id);

    setTimeout(() => {
      this.setState({
        modalImg: largeImage.largeImageURL,
        isLoading: false,
      });
      this.toggleModal();
    }, 500);
  };

  handleSubmit = currentSearch => {
    this.setState({ images: [], currentSearch: currentSearch, pageNr: 1 });
    if (!currentSearch) {
      alert('Enter your request!');
    }
  };

  handleClickMore = () => {
    this.setState({
      pageNr: this.state.pageNr + 1,
    });
  };

  fetchImageToArray = async prevState => {
    try {
      this.setState({ isLoading: true });
      const { currentSearch, pageNr } = this.state;
      const { totalHits, hits } = await fetchImages(currentSearch, pageNr);
      const pageCount = totalHits / 12;
      this.setState({
        totalPages: pageCount,
      });
      setTimeout(() => {
        if (pageNr !== prevState.pageNr) {
          this.setState(prevState => ({
            images: [...prevState.images, ...hits],
            isLoading: false,
          }));
        } else {
          this.setState({ images: hits, isLoading: false });
        }
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const {
      images,
      currentSearch,
      isLoading,
      pageNr,
      totalPages,
      modalOpen,
      modalImg,
    } = this.state;
    return (
      <Container>
        {isLoading && <Loader />}
        <Searchbar onSubmit={this.handleSubmit} />
        {currentSearch !== '' && (
          <>
            <ImageGallery images={images} openModal={this.openModal} />
            {pageNr < totalPages && <Button onClick={this.handleClickMore} />}
          </>
        )}
        {modalOpen && (
          <Modal
            onClose={this.toggleModal}
            imageUrl={modalImg}
            altText={currentSearch}
          />
        )}
      </Container>
    );
  }
}
