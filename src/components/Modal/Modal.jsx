import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { StyledDivModal, StyledDivOverlay } from './Modal.styles';

export const Modal = ({ src, alt, onClose }) => {
  useEffect(() => {
    const handleKeydown = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    //вешаем слушателя на событие 'keydown' (для закрытия модалки по нажатию на кнопку Escape)
    document.addEventListener('keydown', handleKeydown);

    //при помощи return и колбека имитируем componentWillUnmount, удаляем слушателя
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [onClose]);
  

  const handleClickOverlay = event => {
    //происходит закрытие, если пользователь кликает именно на бэкдроп
    //event.target - это куда кликнули
    //event.currentTarget - в данном случае бэкдроп
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <StyledDivOverlay onClick={handleClickOverlay}>
      <StyledDivModal>
        <img src={src} alt={alt} />
      </StyledDivModal>
    </StyledDivOverlay>
  );
};

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};
