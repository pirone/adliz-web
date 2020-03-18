/* eslint-disable react/prefer-stateless-function */
import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

import api from '../../services/api';
import { Container } from './styles';

export default function Main() {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    const response = await api.get('/serviceCategory');
    setCategories(response.data);
    console.log(response.data);
    console.log(categories);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Container>
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
          {/* {categories.map(cat => (
            <tr>
              <td>cat.name</td>
              <td>cat.description</td>
            </tr>
          ))} */}
        </tbody>
      </Table>
    </Container>
  );
}
