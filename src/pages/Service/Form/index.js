/* eslint-disable react/prop-types */
import React, { useState, useCallback, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

import api from '../../../services/api';
import { MoneyInput, TextInput, Combobox } from '../../../components/Form';

export default function FormService(props) {
  const [categories, setCategories] = useState([]);
  const [service, setService] = useState();

  const regexMoney = '^[1-9]\\d{0,2}(\\.\\d{3})*(,\\d{2})?$';

  const formSchema = Yup.object().shape({
    nome: Yup.string().required('Campo Obrigatório.'),
    preco: Yup.string()
      .required('Campo Obrigatório.')
      .matches(regexMoney, 'Valor inválido.'),
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
    // console.log(service ? 'service.name' : 'Vazio');
  }, [getCategories, serviceId]);

  return (
    <Formik
      enableReinitialize
      initialValues={{
        nome: service ? service.name : '',
        descricao: service ? service.description : '',
        preco: service ? service.price : '',
        categoria: service ? service.category.id : '1',
      }}
      validationSchema={formSchema}
      onSubmit={(values, { resetForm }) => {
        service
          ? props.setSubmit(values, service.id)
          : props.setSubmit(values, resetForm);
      }}
    >
      {({ handleSubmit, handleChange, values, errors, touched }) => (
        <Modal show={modalForm} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Preencha o formulário</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <TextInput
                label="Nome *"
                name="nome"
                placeholder="Ex.: Penteado"
                value={values.nome}
                onChange={handleChange}
                isValid={touched.nome && !errors.nome}
                isInvalid={!!errors.nome}
                errors={errors.nome}
              />
              <TextInput
                label="Descrição"
                placeholder="Ex.: Penteados de cabelo"
                name="descricao"
                value={values.descricao}
                onChange={handleChange}
              />

              <MoneyInput
                label="Preço *"
                name="preco"
                value={values.preco}
                onChange={handleChange}
                isValid={touched.preco && !errors.preco}
                isInvalid={!!errors.preco}
                errors={errors.preco}
              />
              <Combobox
                label="Categoria"
                name="categoria"
                onChange={handleChange}
                value={values.categoria}
                options={categories}
              />
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
