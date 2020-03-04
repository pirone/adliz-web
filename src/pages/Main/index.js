/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

import api from '../../services/api';

import Input from '../../components/Input/index';
import { Container } from './styles';

// import { Container } from './styles';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }

  handleChange = event => {
    this.setState({ name: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { name } = this.state;

    const user = {
      name,
    };

    api.post(`/serviceCategory`, { user }).then(res => {
      console.log(user);
      console.log(res);
      console.log(res.data);
    });
  };

  render() {
    return (
      <Container>
        <form onSubmit={this.handleSubmit}>
          <h1>Categoria de Serviço</h1>

          <Input id="name" label="Nome" />
          <Input
            id="description"
            label="Descrição"
            onChange={this.handleChange}
          />

          <button type="submit">Enviar</button>
        </form>
      </Container>
    );
  }
}
