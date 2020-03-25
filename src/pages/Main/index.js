/* eslint-disable react/prefer-stateless-function */
import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

import api from '../../services/api';
import { Container } from './styles';

export default function Main() {
  const [categories, setCategories] = useState([]);

  const getCategories = () => {
    api
      .get('/serviceCategory')
      .then(result => {
        setCategories(result.data);
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Container>
      <Table responsive>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(cat => (
            <tr>
              <td>{cat.name}</td>
              <td>{cat.description}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
