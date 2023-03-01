import React, { Component } from 'react';

import { Button } from './Button/Button';
import { GlobalStyle } from './Global.styled';
import { ImageGalery } from './ImageGallery/ImageGallery';
import { Layout } from './Layout';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    showModal: false,
    searchQuery: '',
    url: '',
  };

  toogleModal = url => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      url,
    }));
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  render() {
    const { showModal, searchQuery, url } = this.state;
    return (
      <Layout>
        <GlobalStyle />
        <Searchbar onSearch={this.handleFormSubmit} />
        <ImageGalery
          onModal={this.toogleModal}
          searchQuery={searchQuery}
        />
        <Button />
        <Loader />
        {showModal && (
          <Modal onClose={this.toogleModal} url={url} />
        )}
        <ToastContainer
          autoClose={3000}
          theme={'colored'}
        />
      </Layout>
    );
  }
}
