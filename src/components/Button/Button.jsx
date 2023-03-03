import { LoadButton } from './Button.styled';
import PropTypes from 'prop-types';

export const Button = ({ onClick }) => {
  return (
    <>
      <LoadButton onClick={onClick}>Load More</LoadButton>
    </>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
