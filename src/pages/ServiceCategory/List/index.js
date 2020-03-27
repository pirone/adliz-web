/* eslint-disable react/prefer-stateless-function */
import React, { useState, useEffect } from 'react';
import { Table, Button, Pagination } from 'react-bootstrap';

import api from '../../../services/api';
import { Container } from './styles';

import Form from '../Form';
import Modalz from '../../../components/Modal';

export default function Main() {
  const [categories, setCategories] = useState([]);
  const [showAddFormModal, setShowAddFormModal] = useState(false);
  const [showEditFormModal, setShowEditFormModal] = useState(false);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [modalResponseContent, setModalResponseContent] = useState();
  const [categoryUpdate, setCategoryUpdate] = useState();
  const [currentPage, setCurrentPage] = useState(0);

  const [totalPages, setTotalPages] = useState();

  const pageItems = [];

  for (let index = 0; index < totalPages; index += 1) {
    pageItems.push(
      <Pagination.Item
        key={index}
        active={index === currentPage}
        onClick={() => setCurrentPage(index)}
      >
        {index + 1}
      </Pagination.Item>
    );
  }

  const getCategories = () => {
    api
      .get(`/serviceCategory/all/${currentPage}`)
      .then(result => {
        setCategories(result.data.content);
        setTotalPages(result.data.totalPages);
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  const getCategory = async id => {
    try {
      const { data: category } = await api.get(`/serviceCategory/${id}`);
      setCategoryUpdate(category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, [currentPage]);

  const showHideAddModal = () => {
    setShowAddFormModal(!showAddFormModal);
  };

  const showHideEditModal = id => {
    setShowEditFormModal(!showEditFormModal);
    if (showEditFormModal === false) {
      getCategory(id);
    }
  };

  const showHideResponseModal = () => {
    setShowResponseModal(!showResponseModal);
  };

  const setSubmit = values => {
    const serviceCategory = {
      name: values.nome,
      description: values.descricao,
    };

    api
      .post(`/serviceCategory`, serviceCategory)
      .then(res => {
        console.log(res.status);
        setModalResponseContent(res.data);
        getCategories();
        showHideAddModal();
      })
      .catch(error => {
        if (!error.response) {
          // network error
          setModalResponseContent(
            'Ocorreu um erro de conexão com o servidor. Por favor contacte um administrador.'
          );
        } else {
          setModalResponseContent(error.response.data.message);
        }
      });

    setShowResponseModal(true);
  };

  const setUpdate = (values, id) => {
    const serviceCategory = {
      name: values.nome,
      description: values.descricao,
    };

    api
      .put(`/serviceCategory/${id}`, serviceCategory)
      .then(res => {
        console.log(res.status);
        setModalResponseContent(res.data);
        getCategories();
        showHideEditModal();
      })
      .catch(error => {
        if (!error.response) {
          // network error
          setModalResponseContent(
            'Ocorreu um erro de conexão com o servidor. Por favor contacte um administrador.'
          );
        } else {
          setModalResponseContent(error.response.data.message);
        }
      });

    setShowResponseModal(true);
  };

  return (
    <Container>
      <div className="topbox">
        <h1>Categorias de Serviço</h1>
        <Button variant="dark" type="button" onClick={showHideAddModal}>
          Incluir
        </Button>
      </div>
      <Table responsive>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th className="actions">Ações</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(cat => (
            <tr key={cat.id}>
              <td>{cat.name}</td>
              <td>{cat.description}</td>
              <td>
                <Button
                  variant="dark"
                  className="btEdit"
                  onClick={() => showHideEditModal(cat.id)}
                >
                  <i className="fa fa-edit" />
                </Button>
                <Button variant="dark">
                  <i className="fa fa-trash" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        <Pagination.First onClick={() => setCurrentPage(0)} />
        <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} />
        {pageItems}
        <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} />
        <Pagination.Last onClick={() => setCurrentPage(totalPages - 1)} />
      </Pagination>
      <Form
        modalForm={showAddFormModal}
        handleClose={showHideAddModal}
        setSubmit={setSubmit}
      />
      <Form
        serviceCategory={categoryUpdate}
        modalForm={showEditFormModal}
        handleClose={showHideEditModal}
        setSubmit={setUpdate}
      />
      <Modalz
        show={showResponseModal}
        title="Resultado"
        content={modalResponseContent}
        onHide={showHideResponseModal}
      />
    </Container>
  );
}
