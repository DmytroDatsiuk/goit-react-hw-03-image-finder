import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { Img, Overlay, PictureModal } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentDidUpdate(_, praveState) {}

  componentWillUnmount() {
    window.removeEventListener(
      'keydown',
      this.handleKeyDown
    );
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <Overlay onClick={this.handleBackdropClick}>
        <PictureModal>
          <Img src={this.props.url} alt="" />
        </PictureModal>
      </Overlay>,
      modalRoot
    );
  }
}
