import PropTypes from 'prop-types';
import { ButtonMore } from './Button.styled';

export const Button = ({ onClick }) => (
  <ButtonMore onClick={onClick} type="button">
    Load more
  </ButtonMore>
);
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
