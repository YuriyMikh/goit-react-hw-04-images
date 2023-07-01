import PropTypes from 'prop-types';
import { Component } from 'react';
import { StyledDivModal, StyledDivOverlay } from './Modal.styles';

export class Modal extends Component {
  //вешаем слушателя на событие 'keydown' (для закрытия модалки по нажатию на кнопку Escape)
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeydown);
  }

  //удаляем слушателя, которого повесили в componentDidMount
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeydown);
  }

  handleClickOverlay = event => {
    //происходит закрытие, если пользователь кликает именно на бэкдроп
    //event.target - это куда кликнули
    //event.currentTarget - в данном случае бэкдроп
    if (event.target === event.currentTarget) {
      this.props.onClose();
    }
  };

  handleKeydown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    const { src, alt } = this.props;

    return (
      <StyledDivOverlay onClick={this.handleClickOverlay}>
        <StyledDivModal>
          <img src={src} alt={alt} />
        </StyledDivModal>
      </StyledDivOverlay>
    );
  }
}

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
};
