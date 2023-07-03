import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  StyledHeader,
  StyledSearchForm,
  StyledButton,
  StyledButtonLabel,
  StyledInput,
} from './Searchbar.styled';

export const Searchbar = ({ handleSearchSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  //черерз setInputValue записываем то, что вводит пользователь в поисковой строке
  const handleChangeValue = event => {
    setInputValue(event.target.value);
  };

  //передаем в App.jsx результат поиска
  const handleSubmit = event => {
    event.preventDefault();
    handleSearchSubmit(inputValue);
    // setInputValue(''); //можно очищать строку поиска при сабмите
  };

  return (
    <StyledHeader>
      <StyledSearchForm onSubmit={handleSubmit}>
        <StyledButton type="submit">
          <StyledButtonLabel />
        </StyledButton>

        <StyledInput
          type="text"
          onChange={handleChangeValue}
          value={inputValue}
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </StyledSearchForm>
    </StyledHeader>
  );
};

Searchbar.propTypes = { handleSearchSubmit: PropTypes.func.isRequired };
