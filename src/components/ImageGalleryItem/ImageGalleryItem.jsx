import { useState } from 'react';
import PropTypes from 'prop-types';
import { StyledImg, StyledLi } from './ImageGalleryIem.styled';
import { Modal } from 'components/Modal/Modal';

export const GalleryImageItem = ({item}) => {
  const [showModal, setShowModal] = useState(false);

  //функция переключатель
  const toggleModal = () => {
    setShowModal(prev => !prev); //при клике на маленькое изображение меняем ключ showModal на true, чтобы оторбразилось большое фото в модалке
  };

  return (
    <StyledLi>
      <StyledImg src={item.webformatURL} alt={item.tags} onClick={toggleModal} />
      {showModal ? (
        <Modal src={item.largeImageURL} alt={item.tags} onClose={toggleModal} />
      ) : null}
    </StyledLi>
  );
};

GalleryImageItem.propTypes = {
  item: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};
