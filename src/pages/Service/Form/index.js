/* eslint-disable react/prop-types */
import React, { useState, useCallback, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

import api from '../../../services/api';

export default function FormService(props) {
  const [categories, setCategories] = useState([]);
  const [service, setService] = useState([]);

  const formSchema = Yup.object().shape({
    nome: Yup.string().required('Campo Obrigatório.'),
  });

  const { serviceId, handleClose, modalForm } = props;

  const getService = async id => {
    try {
      const { data: servico } = await api.get(`/service/${id}`);
      setService(servico);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = useCallback(() => {
    api
      .get(`/serviceCategory/all/0`)
      .then(result => {
        setCategories(result.data.content);
      })
      .catch(error => {
        console.log(error.message);
      });
  }, []);

  useEffect(() => {
    getCategories();
    if (typeof serviceId !== 'undefined') {
      getService(serviceId);
    }
    console.log(service);
  }, [getCategories, serviceId]);

  return (
    <Formik
      enableReinitialize
      initialValues={{
        nome: service ? service.name : '',
        descricao: service ? service.description : '',
        preco: service ? service.price : '',
        categoria: service ? service.category : '',
      }}
      validationSchema={formSchema}
      onSubmit={(values, { resetForm }) => {
        service ? props.setSubmit(values, service.id) : props.setSubmit(values);
        resetForm();
      }}
    >
      {({ handleSubmit, handleChange, values, errors, touched }) => (
        <Modal show={modalForm} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Preencha o formulário</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <Form.Group controlId="inputName">
                <Form.Label>Nome *</Form.Label>
                <Form.Control
                  type="text"
                  name="nome"
                  placeholder="Ex.: Penteado"
                  aria-describedby="inputGroupPrepend"
                  value={values.nome}
                  onChange={handleChange}
                  isValid={touched.nome && !errors.nome}
                  isInvalid={!!errors.nome}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.nome}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="inputDescription">
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ex.: Penteados de cabelo"
                  name="descricao"
                  value={values.descricao}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="inputPrice">
                <Form.Label>Preço</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ex.: 50,00"
                  name="preco"
                  value={values.preco}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="cbCategory">
                <Form.Label>Categoria</Form.Label>
                <Form.Control
                  as="select"
                  custom="true"
                  name="categoria"
                  onChange={handleChange}
                  value={values.categoria}
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancelar
              </Button>
              <Button variant="primary" type="submit">
                Enviar
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      )}
    </Formik>
  );
}
