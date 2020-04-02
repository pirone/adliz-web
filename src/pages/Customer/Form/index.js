/* eslint-disable react/prop-types */
import React, { useState, useCallback, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

import api from '../../../customers/api';
import { DateInput, TextInput, Combobox } from '../../../components/Form';

export default function FormCustomer(props) {
  const [customer, setCustomer] = useState();

  const regexMoney = '^[1-9]\\d{0,2}(\\.\\d{3})*(,\\d{2})?$';

  const formSchema = Yup.object().shape({
    nome: Yup.string().required('Campo Obrigatório.'),
    preco: Yup.string()
      .required('Campo Obrigatório.')
      .matches(regexMoney, 'Valor inválido.'),
  });

  const { customerId, handleClose, modalForm } = props;

  const getCustomer = async id => {
    try {
      const { data: servico } = await api.get(`/customer/${id}`);
      setCustomer(servico);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (typeof customerId !== 'undefined') {
      getCustomer(customerId);
    }
    // console.log(customer ? 'customer.name' : 'Vazio');
  }, [customerId]);

  return (
    <Formik
      enableReinitialize
      initialValues={{
        nome: customer ? customer.name : '',
        descricao: customer ? customer.description : '',
        preco: customer ? customer.price : '',
        categoria: customer ? customer.category.id : '1',
      }}
      validationSchema={formSchema}
      onSubmit={(values, { resetForm }) => {
        customer
          ? props.setSubmit(values, customer.id)
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
                label="CPF *"
                name="cpf"
                value={values.cpf}
                onChange={handleChange}
                errors={[errors.cpf, touched.cpf]}
              />
              <TextInput
                label="Nome *"
                name="nome"
                placeholder="Ex.: Penteado"
                value={values.nome}
                onChange={handleChange}
                errors={[errors.nome, touched.nome]}
              />
              <TextInput
                label="E-mail"
                name="email"
                value={values.email}
                onChange={handleChange}
              />

              <DateInput
                label="Data de Nascimento *"
                name="dtNascimento"
                value={values.dtNascimento}
                onChange={handleChange}
                errors={[errors.dtNascimento, touched.dtNascimento]}
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
