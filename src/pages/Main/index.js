/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

import api from '../../services/api';

import Input from '../../components/Input/index';
import { Container } from './styles';

// import { Container } from './styles';

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      inputName: '',
      inputDescription: '',
    };
  }

  handleChange = event => {
    const inputName = event.target.id;
    const inputValue = event.target.value;

    this.setState({
      [inputName]: inputValue,
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { inputName, inputDescription } = this.state;
    const serviceCategory = {
      name: inputName,
      description: inputDescription,
    };

    console.log(serviceCategory);

    api.post(`/serviceCategory`, serviceCategory).then(res => {
      console.log(res);
    });

    this.setState({
      inputName: '',
      inputDescription: '',
    });
  };

  render() {
    return (
      <Container>
        <form onSubmit={this.handleSubmit}>
          <h1>Categoria de Serviço</h1>

          <Input
            id="inputName"
            label="Nome"
            onChange={this.handleChange}
            value={this.state.inputName}
          />
          <Input
            id="inputDescription"
            label="Descrição"
            onChange={this.handleChange}
            value={this.state.inputDescription}
          />

          <button type="submit">Enviar</button>
        </form>
      </Container>
    );
  }
}
