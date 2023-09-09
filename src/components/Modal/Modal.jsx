import PropTypes from 'prop-types';
import { Component } from 'react';

import { ModalBackdrop, ModalStyles } from './Modal.styled';

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = evt => {
    if (evt.code === 'Escape') {
      this.props.onClose();
    }
  };

  onClickBackdrop = evt => {
    if (evt.currentTarget === evt.target) {
      this.props.onClose();
    }
  };

  render() {
    const { imageUrl, altText } = this.props;
    return (
      <ModalBackdrop onClick={this.onClickBackdrop}>
        <ModalStyles>
          <img src={imageUrl} alt={altText} />
        </ModalStyles>
      </ModalBackdrop>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
