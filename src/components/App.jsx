import { useEffect, useState } from 'react';

import { Container } from './App.styled';

import Searchbar from './Searchbar/Searchbar';
import { fetchImages } from 'helpers/pictures';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import Modal from './Modal/Modal';

export default function App() {
  const [images, setImages] = useState([]);
  const [pageNr, setPageNr] = useState(1);
  const [currentSearch, setCurrentSearch] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState('');

  const openModal = id => {
    setIsLoading(true);
    const largeImage = images.find(image => image.id === id);

    setTimeout(() => {
      setModalImg(largeImage.largeImageURL);
      setIsLoading(false);
      setModalOpen(true);
    }, 500);
    window.addEventListener('keydown', handleKeyDown);
  };

  const removeEvenLis = () => {
    setModalOpen(false);
    window.removeEventListener('keydown', handleKeyDown);
  };

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      removeEvenLis();
    }
  };

  const onClickBackDrop = evt => {
    if (evt.currentTarget === evt.target) {
      removeEvenLis();
    }
  };

  const fetch = async (currentSearch, pageNr) => {
    const { totalHits, hits } = await fetchImages(currentSearch, pageNr);
    const pageCount = totalHits / 12;
    setTotalPages(pageCount);
    return hits;
  };

  const handleSubmit = search => {
    setIsLoading(true);
    setImages([]);
    setCurrentSearch(search);
    setPageNr(1);
    setTimeout(() => {
      if (!search) {
        alert('Enter your request!');
      } else {
        fetch(search, 1).then(hits => setImages(hits));
        setIsLoading(false);
      }
    }, 500);
  };

  const handleClickMore = e => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(true);
      e.preventDefault();
      setPageNr(prevPage => prevPage + 1);
      fetch(currentSearch, pageNr + 1).then(hits =>
        setImages(prevState => [...prevState, ...hits])
      );
      setIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    if (!currentSearch) {
      setCurrentSearch('');
      setImages([]);
      return;
    }
  }, [pageNr, currentSearch]);

  return (
    <Container>
      {isLoading && <Loader />}
      <Searchbar onSubmit={handleSubmit} />
      {currentSearch !== '' && (
        <>
          <ImageGallery images={images} openModal={openModal} />
          {pageNr < totalPages && <Button onClick={handleClickMore} />}
        </>
      )}
      {modalOpen && (
        <Modal onClose={onClickBackDrop}>
          <img src={modalImg} alt={currentSearch} />
        </Modal>
      )}
    </Container>
  );
}
