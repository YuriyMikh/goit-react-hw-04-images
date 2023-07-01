import React, { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchPixabay } from './services/api-pixabay';
import { AppContainer } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    showBtn: false,
    loading: false,
  };

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    //прописываем на какие именно изменения будет реагировать componentDidUpdate (иначе будет бесконечный fetch)
    if (query !== prevState.query || page !== prevState.page) {
      try {
        //при запросе деструктуризируем hits и totalHits
        await fetchPixabay(query, page).then(({ hits, totalHits }) => {
          //в state записываем новые значения:
          this.setState(prevState => ({
            images: [...prevState.images, ...hits], //в массив images распыляем фото которые были в prevState плюс которые пришли после fetchPixabay
            showBtn: page < Math.ceil(totalHits / 12), //если проверка приводит к true - в state, в ключ showBtn записывается true. Будет использовано для показа (или не показа) кнопки "Load More"
          }));
          if (hits.length === 0) {
            return toast.info(
              'Sorry, there are no images matching your search query. Please try again.'
            );
          }
        });
      } catch (error) {
        toast.error(
          'Oops! Something went wrong. Please, try reloading the page.'
        );
      } finally {
        this.setState({ loading: false }); //в любом случае переводим состояние лоадера в false, чтобы он больше не отображался
      }
    }
  }

  handleSearchSubmit = searchQuery => {
    //если пользователь ничего не ввел - выводим тост
    if (searchQuery.trim() === '') {
      return toast.info('Enter a query');
    }

    this.setState({
      query: searchQuery, // иначе записываем то что ввел пользователь в this.state.query
      page: 1, //сбрсываем страничку на единицу (изначальное значение state)
      images: [], //очищаем массив фото
      showBtn: false, //переводим в false, как было в изначальном состоянии
      loading: true, //лоадер в true, чтобы отобразился
    });
  };

  //при нажатии на "Load more" прибавляем +1 страничку для последующей загрузки фото
  handleClickLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, loading, showBtn } = this.state;

    return (
      <AppContainer>
        <Searchbar handleSearchSubmit={this.handleSearchSubmit} />
        {loading ? <Loader /> : <ImageGallery images={images} />}
        {showBtn && <Button handleClickLoadMore={this.handleClickLoadMore} />}
      </AppContainer>
    );
  }
}
