// import PropTypes from 'prop-types';
import { Component } from 'react';
import { StyledImg, StyledLi } from './ImageGalleryIem.styled';
import { Modal } from 'components/Modal/Modal';

export class GalleryImageItem extends Component {
  state = {
    showModal: false,
  };

  //функция переключатель
  toggleModal = () => {
    this.setState(prev => ({ showModal: !prev.showModal })); //при клике на маленькое изображение меняем ключ showModal на true, чтобы оторбразилось фото в модалке
  };

  render() {
    const { webformatURL, tags, largeImageURL } = this.props.item; //деструктуризируем полученные пропсы

    return (
      <StyledLi>
        <StyledImg src={webformatURL} alt={tags} onClick={this.toggleModal} />
        {this.state.showModal ? (
          <Modal src={largeImageURL} alt={tags} onClose={this.toggleModal} />
        ) : null}
      </StyledLi>
    );
  }
}

// GalleryImageItem.propTypes = {
//   webformatURL: PropTypes.string.isRequired,
//   tags: PropTypes.string.isRequired,
//   largeImageURL: PropTypes.string.isRequired,
// };
