import PropTypes from 'prop-types';
import { Component } from 'react';
import {
  StyledHeader,
  StyledSearchForm,
  StyledButton,
  StyledButtonLabel,
  StyledInput,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  //записываем в state то что вводит пользователь в поисковой строке
  handleChangeValue = event => {
    this.setState({ inputValue: event.target.value });
  };

  //передаем в App.jsx результат поиска
  handleSubmit = event => {
    event.preventDefault();
    this.props.handleSearchSubmit(this.state.inputValue);
    // this.setState({ inputValue: '' }); //можно очищать строку поиска при сабмите
  };

  render() {
    return (
      <StyledHeader>
        <StyledSearchForm onSubmit={this.handleSubmit}>
          <StyledButton type="submit">
            <StyledButtonLabel />
          </StyledButton>

          <StyledInput
            type="text"
            onChange={this.handleChangeValue}
            value={this.state.inputValue}
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </StyledSearchForm>
      </StyledHeader>
    );
  }
}

Searchbar.propTypes = { handleSearchSubmit: PropTypes.func.isRequired };
