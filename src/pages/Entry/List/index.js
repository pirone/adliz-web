import React, { useState, useEffect, useCallback } from 'react';
import { Table, Button } from 'react-bootstrap';

import api from '../../../services/api';

import Form from '../Form';
import { InfoModal, ConfirmDialog } from '../../../components/Modal';
import Pagination from '../../../components/Pagination';

export default function EntryList() {
  const [entries, setEntries] = useState([]);
  const [showAddFormModal, setShowAddFormModal] = useState(false);
  const [showEditFormModal, setShowEditFormModal] = useState(false);
  const [showDeleteFormModal, setShowDeleteFormModal] = useState(false);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [modalResponseContent, setModalResponseContent] = useState();
  const [entryUpdate, setEntryUpdate] = useState();
  const [entryDelete, setEntryDelete] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState();

  const getEntries = useCallback(() => {
    api
      .get(`/entry/all/${currentPage}`)
      .then(result => {
        setEntries(result.data.content);
        setTotalPages(result.data.totalPages);
      })
      .catch(error => {
        console.log(error.message);
      });
  }, [currentPage]);

  useEffect(() => {
    getEntries();
  }, [getEntries, currentPage]);

  const showHideAddModal = () => {
    setShowAddFormModal(!showAddFormModal);
  };

  const showHideEditModal = id => {
    setShowEditFormModal(!showEditFormModal);
    if (showEditFormModal === false) {
      setEntryUpdate(id);
    }
  };

  const showHideDeleteModal = id => {
    setShowDeleteFormModal(!showDeleteFormModal);
    setEntryDelete(id);
  };

  const showHideResponseModal = () => {
    setShowResponseModal(!showResponseModal);
  };

  const setSubmit = (values, resetForm) => {
    const entry = {
      name: values.nome,
      description: values.descricao,
      price: values.preco,
      category: {
        id: values.categoria,
      },
    };

    api
      .post(`/entry`, entry)
      .then(res => {
        setModalResponseContent(res.data.message);
        getEntries();
        showHideAddModal();
        resetForm();
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
    const entry = {
      name: values.nome,
      description: values.descricao,
      price: values.preco,
      category: {
        id: values.categoria,
      },
    };

    api
      .put(`/entry/${id}`, entry)
      .then(res => {
        setModalResponseContent(res.data);
        getEntries();
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

  const handleDelete = () => {
    api
      .delete(`/entryEntry/${entryDelete}`)
      .then(res => {
        setModalResponseContent(res.data);
        getEntries();
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
          <h1>Entradas</h1>
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
            <th>Funcionário</th>
            <th>Cliente</th>
            <th>Total</th>
            <th className="actions">Ações</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(entry => (
            <tr key={entry.id}>
              <td>{entry.employee.person.name}</td>
              <td>{entry.customer.person.name}</td>
              <td>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(entry.record.value)}
              </td>
              <td>
                <Button
                  variant="dark"
                  className="btEdit"
                  onClick={() => showHideEditModal(entry.id)}
                >
                  <i className="fa fa-edit" />
                </Button>
                <Button
                  variant="dark"
                  onClick={() => showHideDeleteModal(entry.id)}
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
        entryId={entryUpdate}
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
