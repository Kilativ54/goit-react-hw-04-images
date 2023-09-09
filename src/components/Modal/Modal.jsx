import PropTypes from 'prop-types';

import { ModalBackdrop, ModalStyles } from './Modal.styled';

export default function Modal({ onClose, children }) {
  return (
    <ModalBackdrop onClick={onClose}>
      <ModalStyles>{children}</ModalStyles>
    </ModalBackdrop>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};
