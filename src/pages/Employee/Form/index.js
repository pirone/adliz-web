/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

import api from '../../../services/api';
import {
  DateComponent,
  TextInput,
  CpfInput,
  PhoneInput,
  PercentInput,
} from '../../../components/Form';

export default function FormEmployee(props) {
  const [employee, setEmployee] = useState();

  const regexCpf = '[0-9]{3}.?[0-9]{3}.?[0-9]{3}-?[0-9]{2}';
  const regexPhone = '\\([1-9][0-9]\\) ([1-9]{1})?[0-9]{4}-[0-9]{4}';

  const formSchema = Yup.object().shape({
    cpf: Yup.string()
      .required('Campo Obrigatório.')
      .matches(regexCpf, 'Valor Inválido'),
    nome: Yup.string().required('Campo Obrigatório.'),
    dtNascimento: Yup.string().required('Campo Obrigatório.'),
    email: Yup.string().email('Email inválido.'),
    phone: Yup.string().matches(regexPhone, 'Telefone inválido'),
    comissao: Yup.number().required('Campo Obrigatório'),
  });

  const { employeeId, handleClose, modalForm } = props;

  const getEmployee = async id => {
    try {
      const { data: empregado } = await api.get(`/employee/${id}`);
      setEmployee(empregado);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (typeof employeeId !== 'undefined') {
      getEmployee(employeeId);
    }
    // console.log(employee ? 'employee.name' : 'Vazio');
  }, [employeeId]);

  return (
    <Formik
      enableReinitialize
      initialValues={{
        nome: employee ? employee.person.name : '',
        cpf: employee ? employee.person.cpf : '',
        descricao: employee ? employee.person.description : '',
        email: employee ? employee.person.email : '',
        dtNascimento: employee ? employee.person.birth_date : '',
        phone:
          employee && employee.person.phones.length
            ? employee.person.phones[0]
            : '',
        endereco:
          employee && employee.person.adresses.length
            ? employee.person.adresses[0]
            : '',
        comissao: employee ? employee.comissionRate : '',
      }}
      validationSchema={formSchema}
      onSubmit={(values, actions) => {
        employee
          ? props.setSubmit(values, actions, employee.id)
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
              <PercentInput
                label="Comissão"
                name="comissao"
                value={values.comissao}
                onChange={handleChange}
                errors={[errors.comissao, touched.comissao]}
              />
              <TextInput
                label="E-mail"
                name="email"
                value={values.email}
                onChange={handleChange}
                errors={[errors.email, touched.email]}
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
              <TextInput
                label="Endereço"
                name="endereco"
                value={values.endereco}
                onChange={handleChange}
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
