/* eslint-disable react/prop-types */
import React, { useState, useCallback, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

import api from '../../../services/api';
import {
  MoneyInput,
  TextInput,
  Combobox,
  PercentInput,
} from '../../../components/Form';

export default function FormService(props) {
  const [entry, setEntry] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [services, setServices] = useState();
  const [employees, setEmployees] = useState([]);

  const regexMoney = '^[1-9]\\d{0,2}(\\.\\d{3})*(,\\d{2})?$';

  const formSchema = Yup.object().shape({
    nome: Yup.string().required('Campo Obrigatório.'),
    preco: Yup.string()
      .required('Campo Obrigatório.')
      .matches(regexMoney, 'Valor inválido.'),
  });

  const { entryId, handleClose, modalForm } = props;

  const getEntry = async id => {
    try {
      const { data: entrada } = await api.get(`/entry/${id}`);
      setEntry(entrada);
    } catch (error) {
      console.log(error);
    }
  };

  const getServices = useCallback(() => {
    api
      .get(`/service/all/`)
      .then(result => {
        setServices(result.data.content);
      })
      .catch(error => {
        console.log(error.message);
      });
  }, []);

  const getEmployees = useCallback(() => {
    api
      .get(`/employee/all/`)
      .then(result => {
        setEmployees(result.data.content);
      })
      .catch(error => {
        console.log(error.message);
      });
  }, []);

  const getCustomers = useCallback(() => {
    api
      .get(`/customer/all/`)
      .then(result => {
        setCustomers(result.data.content);
      })
      .catch(error => {
        console.log(error.message);
      });
  }, []);

  useEffect(() => {
    getServices();
    getEmployees();
    getCustomers();
    if (typeof entryId !== 'undefined') {
      getEntry(entryId);
    }
    // console.log(service ? 'service.name' : 'Vazio');
  }, [getServices, getEmployees, getCustomers, entryId]);

  return (
    <Formik
      enableReinitialize
      validationSchema={formSchema}
      onSubmit={(values, { resetForm }) => {
        entry
          ? props.setSubmit(values, entry.id)
          : props.setSubmit(values, resetForm);
      }}
      initialValues={{
        comissao: employees.length ? employees[0].comissionRate : '',
      }}
    >
      {({ handleSubmit, handleChange, values, errors, touched }) => (
        <Modal show={modalForm} onHide={handleClose} backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>Preencha o formulário</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <Combobox
                label="Cliente"
                name="cliente"
                onChange={handleChange}
                value={values.cliente}
                options={customers}
              />
              <Combobox
                label="Funcionário"
                name="funcionario"
                onChange={e => {
                  handleChange(e);
                  values.comissao = '10,00';
                }}
                value={values.funcionario}
                options={employees}
              />
              <Combobox
                label="Serviço"
                name="servico"
                onChange={handleChange}
                value={values.servico}
                options={services}
              />
              <PercentInput
                label="Comissão"
                name="comissao"
                value={values.comissao}
                onChange={handleChange}
                errors={[errors.comissao, touched.comissao]}
              />
              <MoneyInput
                label="Preço *"
                name="preco"
                value={values.preco}
                onChange={handleChange}
                errors={[errors.preco, touched.preco]}
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
