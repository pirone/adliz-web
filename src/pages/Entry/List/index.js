import React, { useState, useEffect, useCallback } from 'react';
import { Table, Button } from 'react-bootstrap';

import api from '../../../services/api';

import Form from '../Form';
import { InfoModal, ConfirmDialog } from '../../../components/Modal';
import Pagination from '../../../components/Pagination';

export default function EntryList() {
  const [services, setServices] = useState([]);
  const [showAddFormModal, setShowAddFormModal] = useState(false);
  const [showEditFormModal, setShowEditFormModal] = useState(false);
  const [showDeleteFormModal, setShowDeleteFormModal] = useState(false);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [modalResponseContent, setModalResponseContent] = useState();
  const [serviceUpdate, setServiceUpdate] = useState();
  const [serviceDelete, setServiceDelete] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState();

  const getServices = useCallback(() => {
    api
      .get(`/service/all/${currentPage}`)
      .then(result => {
        setServices(result.data.content);
        setTotalPages(result.data.totalPages);
      })
      .catch(error => {
        console.log(error.message);
      });
  }, [currentPage]);

  useEffect(() => {
    getServices();
  }, [getServices, currentPage]);

  const showHideAddModal = () => {
    setShowAddFormModal(!showAddFormModal);
  };

  const showHideEditModal = id => {
    setShowEditFormModal(!showEditFormModal);
    if (showEditFormModal === false) {
      setServiceUpdate(id);
    }
  };

  const showHideDeleteModal = id => {
    setShowDeleteFormModal(!showDeleteFormModal);
    setServiceDelete(id);
  };

  const showHideResponseModal = () => {
    setShowResponseModal(!showResponseModal);
  };

  const setSubmit = (values, resetForm) => {
    const service = {
      name: values.nome,
      description: values.descricao,
      price: values.preco,
      category: {
        id: values.categoria,
      },
    };

    api
      .post(`/service`, service)
      .then(res => {
        setModalResponseContent(res.data.message);
        getServices();
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
    const service = {
      name: values.nome,
      description: values.descricao,
      price: values.preco,
      category: {
        id: values.categoria,
      },
    };

    api
      .put(`/service/${id}`, service)
      .then(res => {
        setModalResponseContent(res.data);
        getServices();
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
      .delete(`/serviceService/${serviceDelete}`)
      .then(res => {
        setModalResponseContent(res.data);
        getServices();
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
          <h1>Serviços</h1>
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
            <th>Nome</th>
            <th>Descrição</th>
            <th>Categoria</th>
            <th>Preço</th>
            <th className="actions">Ações</th>
          </tr>
        </thead>
        <tbody>
          {services.map(service => (
            <tr key={service.id}>
              <td>{service.name}</td>
              <td>{service.description}</td>
              <td>{service.category.name}</td>
              <td>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(service.price)}
              </td>
              <td>
                <Button
                  variant="dark"
                  className="btEdit"
                  onClick={() => showHideEditModal(service.id)}
                >
                  <i className="fa fa-edit" />
                </Button>
                <Button
                  variant="dark"
                  onClick={() => showHideDeleteModal(service.id)}
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
        serviceId={serviceUpdate}
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
