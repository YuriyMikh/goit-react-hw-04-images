import PropTypes from 'prop-types';
import { StyledButton } from './Button.styled';

export const Button = ({ handleClickLoadMore }) => {
  return (
    <StyledButton type="button" onClick={handleClickLoadMore}>
      Load More
    </StyledButton>
  );
};

Button.propTypes = {
  handleClickLoadMore: PropTypes.func.isRequired,
};
