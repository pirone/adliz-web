/* eslint-disable react/prefer-stateless-function */
import React, { useState, useEffect, useCallback } from 'react';
import { Table, Button } from 'react-bootstrap';
import moment from 'moment';

import api from '../../../services/api';

import Form from '../Form';
import { InfoModal, ConfirmDialog } from '../../../components/Modal';
import Pagination from '../../../components/Pagination';

export default function Main() {
  const [customers, setCustomers] = useState([]);
  const [showAddFormModal, setShowAddFormModal] = useState(false);
  const [showEditFormModal, setShowEditFormModal] = useState(false);
  const [showDeleteFormModal, setShowDeleteFormModal] = useState(false);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [modalResponseContent, setModalResponseContent] = useState();
  const [customerUpdate, setCustomerUpdate] = useState();
  const [customerDelete, setCustomerDelete] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState();

  const getCustomers = useCallback(() => {
    api
      .get(`/customer/all/${currentPage}`)
      .then(result => {
        setCustomers(result.data.content);
        setTotalPages(result.data.totalPages);
      })
      .catch(error => {
        console.log(error.message);
      });
  }, [currentPage]);

  useEffect(() => {
    getCustomers();
  }, [getCustomers, currentPage]);

  const showHideAddModal = () => {
    setShowAddFormModal(!showAddFormModal);
  };

  const showHideEditModal = id => {
    setShowEditFormModal(!showEditFormModal);
    if (showEditFormModal === false) {
      setCustomerUpdate(id);
    }
  };

  const showHideDeleteModal = id => {
    setShowDeleteFormModal(!showDeleteFormModal);
    setCustomerDelete(id);
  };

  const showHideResponseModal = () => {
    setShowResponseModal(!showResponseModal);
  };

  const setSubmit = (values, actions) => {
    const customer = {
      person: {
        name: values.nome,
        email: values.email,
        cpf: values.cpf,
        birth_date: moment(values.dtNascimento, 'DD/MM/YYYY')
          .toDate()
          .getTime(),
        phones: [values.phone],
        adresses: [values.endereco],
      },
    };

    api
      .post(`/customer`, customer)
      .then(res => {
        setModalResponseContent(res.data.message);
        getCustomers();
        showHideAddModal();
        actions.resetForm();
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
      })
      .finally(() => {
        setShowResponseModal(true);
        actions.setSubmitting(false);
      });
  };

  const setUpdate = (values, actions, id) => {
    const customer = {
      person: {
        name: values.nome,
        email: values.email,
        cpf: values.cpf,
        birth_date: moment(values.dtNascimento, 'DD/MM/YYYY')
          .toDate()
          .getTime(),
        phones: [values.phone],
        adresses: [values.endereco],
      },
    };

    api
      .put(`/customer/${id}`, customer)
      .then(res => {
        setModalResponseContent(res.data);
        getCustomers();
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
      })
      .finally(() => {
        setShowResponseModal(true);
        actions.setSubmitting(false);
      });
  };

  const handleDelete = () => {
    api
      .delete(`/customerCustomer/${customerDelete}`)
      .then(res => {
        setModalResponseContent(res.data);
        getCustomers();
        showHideDeleteModal();
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
    <div className="container">
      <div className="topbox">
        <div className="pageTitle">
          <h1>Clientes</h1>
        </div>
        <div className="pageButton">
          <Button variant="dark" type="button" onClick={showHideAddModal}>
            Incluir
          </Button>
        </div>
      </div>
      <Table responsive>
        <thead>
          <tr>
            <th>CPF</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Data de Nascimento</th>
            <th className="actions">Ações</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer.id}>
              <td>{customer.person.cpf}</td>
              <td>{customer.person.name}</td>
              <td>{customer.person.email}</td>
              <td>{customer.person.birth_date}</td>
              <td>
                <Button
                  variant="dark"
                  className="btEdit"
                  onClick={() => showHideEditModal(customer.id)}
                >
                  <i className="fa fa-edit" />
                </Button>
                <Button
                  variant="dark"
                  onClick={() => showHideDeleteModal(customer.id)}
                >
                  <i className="fa fa-trash" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <Form
        modalForm={showAddFormModal}
        handleClose={showHideAddModal}
        setSubmit={setSubmit}
      />
      <Form
        customerId={customerUpdate}
        modalForm={showEditFormModal}
        handleClose={showHideEditModal}
        setSubmit={setUpdate}
      />
      <InfoModal
        show={showResponseModal}
        title="Resultado"
        content={modalResponseContent}
        onHide={showHideResponseModal}
      />
      <ConfirmDialog
        show={showDeleteFormModal}
        title="Confirmação"
        content="Tem certeza que deseja excluir o registro?"
        onHide={showHideDeleteModal}
        confirm={handleDelete}
      />
    </div>
  );
}
