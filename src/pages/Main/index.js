/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

import Modal from '../../components/Modal';

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
      modal: false,
      loading: false,
      result: '',
    };
  }

  handleChange = event => {
    const inputName = event.target.id;
    const inputValue = event.target.value;

    this.setState({
      [inputName]: inputValue,
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ loading: true });

    const { inputName, inputDescription } = this.state;
    const serviceCategory = {
      name: inputName,
      description: inputDescription,
    };

    try {
      api.post(`/serviceCategory`, serviceCategory).then(res => {
        console.log(res.status);
        this.setState({
          result: res.data,
        });
      });

      this.setState({
        modal: true,
        inputName: '',
        inputDescription: '',
      });
    } catch (error) {
      console.log('Ocorreu um erro. Por favor, tente novamente.');
      console.log(error);
    } finally {
      this.setState({ loading: false });
    }
  };

  showModal = () => {
    this.setState({
      modal: true,
    });
  };

  hideModal = () => {
    this.setState({
      modal: false,
    });
  };

  render() {
    const { inputName, inputDescription, loading, modal, result } = this.state;
    return (
      <Container>
        <form onSubmit={this.handleSubmit}>
          <h1>Categoria de Serviço</h1>

          <Input
            id="inputName"
            label="Nome"
            onChange={this.handleChange}
            value={inputName}
            required
          />
          <Input
            id="inputDescription"
            label="Descrição"
            onChange={this.handleChange}
            value={inputDescription}
          />
          <button type="submit">
            {loading ? <i className="fa fa-spinner fa-pulse" /> : 'Enviar'}
          </button>
          <button type="button" onClick={this.showModal}>
            Modal
          </button>
          <Modal show={modal} close={this.hideModal} content={result} />
        </form>
      </Container>
    );
  }
}
