/* eslint-disable react/prop-types */
import React, { useState, useCallback, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

import api from '../../../services/api';
import {
  DateComponent,
  TextInput,
  CpfInput,
  PhoneInput,
} from '../../../components/Form';

export default function FormCustomer(props) {
  const [customer, setCustomer] = useState();

  const regexCpf = '[0-9]{3}.?[0-9]{3}.?[0-9]{3}-?[0-9]{2}';

  const formSchema = Yup.object().shape({
    cpf: Yup.string()
      .required('Campo Obrigatório.')
      .matches(regexCpf, 'Valor Inválido'),
    nome: Yup.string().required('Campo Obrigatório.'),
    dtNascimento: Yup.string().required('Campo Obrigatório.'),
  });

  const { customerId, handleClose, modalForm } = props;

  const getCustomer = async id => {
    try {
      const { data: cliente } = await api.get(`/customer/${id}`);
      setCustomer(cliente);
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
        nome: customer ? customer.person.name : '',
        cpf: customer ? customer.person.cpf : '',
        descricao: customer ? customer.person.description : '',
        email: customer ? customer.person.email : '',
        dtNascimento: customer ? customer.person.birth_date : '',
        phone:
          customer && customer.person.phones ? customer.person.phones[0] : '',
      }}
      validationSchema={formSchema}
      onSubmit={(values, actions) => {
        customer
          ? props.setSubmit(values, actions, customer.id)
          : props.setSubmit(values, actions);
      }}
    >
      {({
        handleSubmit,
        handleChange,
        values,
        errors,
        touched,
        setFieldValue,
        isSubmitting,
      }) => (
        <Modal show={modalForm} onHide={handleClose} backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>Preencha o formulário</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <CpfInput
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

              <DateComponent
                label="Data de Nascimento *"
                name="dtNascimento"
                value={values.dtNascimento}
                setFieldValue={setFieldValue}
                errors={[errors.dtNascimento, touched.dtNascimento]}
              />
              <PhoneInput
                label="Telefone"
                name="phone"
                value={values.phone}
                onChange={handleChange}
                errors={[errors.phone, touched.phone]}
              />
            </Modal.Body>
            <Modal.Footer>
              {isSubmitting ? (
                <Button variant="primary">
                  <i className="fa fa-spinner fa-spin" />
                </Button>
              ) : (
                <>
                  <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                  </Button>
                  <Button variant="primary" type="submit">
                    Enviar
                  </Button>
                </>
              )}
            </Modal.Footer>
          </Form>
        </Modal>
      )}
    </Formik>
  );
}
