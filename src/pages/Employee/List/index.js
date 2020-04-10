/* eslint-disable react/prefer-stateless-function */
import React, { useState, useEffect, useCallback } from 'react';
import { Table, Button } from 'react-bootstrap';
import moment from 'moment';

import api from '../../../services/api';
import { Container } from './styles';

import Form from '../Form';
import { InfoModal, ConfirmDialog } from '../../../components/Modal';
import Pagination from '../../../components/Pagination';

export default function Main() {
  const [employees, setEmployees] = useState([]);
  const [showAddFormModal, setShowAddFormModal] = useState(false);
  const [showEditFormModal, setShowEditFormModal] = useState(false);
  const [showDeleteFormModal, setShowDeleteFormModal] = useState(false);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [modalResponseContent, setModalResponseContent] = useState();
  const [employeeUpdate, setEmployeeUpdate] = useState();
  const [employeeDelete, setEmployeeDelete] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState();

  const getEmployees = useCallback(() => {
    api
      .get(`/employee/all/${currentPage}`)
      .then(result => {
        setEmployees(result.data.content);
        setTotalPages(result.data.totalPages);
      })
      .catch(error => {
        console.log(error.message);
      });
  }, [currentPage]);

  useEffect(() => {
    getEmployees();
  }, [getEmployees, currentPage]);

  const showHideAddModal = () => {
    setShowAddFormModal(!showAddFormModal);
  };

  const showHideEditModal = id => {
    setShowEditFormModal(!showEditFormModal);
    if (showEditFormModal === false) {
      setEmployeeUpdate(id);
    }
  };

  const showHideDeleteModal = id => {
    setShowDeleteFormModal(!showDeleteFormModal);
    setEmployeeDelete(id);
  };

  const showHideResponseModal = () => {
    setShowResponseModal(!showResponseModal);
  };

  const setSubmit = (values, actions) => {
    const employee = {
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
      .post(`/employee`, employee)
      .then(res => {
        setModalResponseContent(res.data.message);
        getEmployees();
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
    const employee = {
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
      .put(`/employee/${id}`, employee)
      .then(res => {
        setModalResponseContent(res.data);
        getEmployees();
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
      .delete(`/employee/${employeeDelete}`)
      .then(res => {
        setModalResponseContent(res.data);
        getEmployees();
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
    <Container>
      <div className="topbox">
        <div className="pageTitle">
          <h1>Empregados</h1>
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
          {employees.map(employee => (
            <tr key={employee.id}>
              <td>{employee.person.cpf}</td>
              <td>{employee.person.name}</td>
              <td>{employee.person.email}</td>
              <td>{employee.person.birth_date}</td>
              <td>
                <Button
                  variant="dark"
                  className="btEdit"
                  onClick={() => showHideEditModal(employee.id)}
                >
                  <i className="fa fa-edit" />
                </Button>
                <Button
                  variant="dark"
                  onClick={() => showHideDeleteModal(employee.id)}
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
        employeeId={employeeUpdate}
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
    </Container>
  );
}
