import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchPixabay } from './services/api-pixabay';
import { AppContainer } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [showBtn, setShowBtn] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      return;
    }

    try {
      fetchPixabay(query, page).then(({ hits, totalHits }) => {
        if (hits.length === 0) {
          return toast.info(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }

        //в useState записываем новые значения:
        setImages(prev => [...prev, ...hits]); //в массив images распыляем фото которые уже были в prev плюс которые пришли после fetchPixabay
        setShowBtn(page < Math.ceil(totalHits / 12)); //если проверка приводит к true - в setShowBtn записываем true. Будет использовано для показа (или не показа) кнопки "Load More"
      });
    } catch (error) {
      toast.error(
        'Oops! Something went wrong. Please, try reloading the page.'
      );
    } finally {
      setLoading(false); //в любом случае переводим состояние лоадера в false, чтобы он больше не отображался
    }
  }, [page, query]);

  const handleSearchSubmit = searchQuery => {
    //если пользователь ничего не ввел - выводим тост
    if (searchQuery.trim() === '') {
      return toast.info('Enter a query');
    }

    setQuery(searchQuery); //иначе записываем то, что ввел пользователь в setQuery
    setPage(1); //сбрсываем страничку до единицы
    setImages([]); //очищаем массив фото
    setShowBtn(false); //переводим в false, как было в изначальном состоянии
    setLoading(true); //лоадер в true, чтобы отобразился
  };

  //при нажатии на "Load more" прибавляем +1 страничку для последующей загрузки фото
  const handleClickLoadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <AppContainer>
      <Searchbar handleSearchSubmit={handleSearchSubmit} />
      {loading ? <Loader /> : <ImageGallery images={images} />}
      {showBtn && <Button handleClickLoadMore={handleClickLoadMore} />}
    </AppContainer>
  );
};
