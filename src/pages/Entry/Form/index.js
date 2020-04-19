/* eslint-disable react/prop-types */
import React, { useState, useCallback, useEffect } from 'react';
import { Form, Button, Modal, Table } from 'react-bootstrap';
import { Formik, useFormikContext } from 'formik';
import * as Yup from 'yup';

import api from '../../../services/api';
import {
  MoneyInput,
  TextInput,
  Combobox,
  PercentInput,
} from '../../../components/Form';

import { CustomCombo, BtRemoveItem } from './styles';

export default function FormService(props) {
  const [entry, setEntry] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [services, setServices] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [servicosRealizados, setServicosRealizados] = useState([]);

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

  const loadComission = employeeId => {
    return api
      .get(`/employee/${employeeId}`)
      .then(response => {
        console.log(response.data.comissionRate);
        return response.data.comissionRate;
      })
      .catch(error => console.log(error));
  };

  const addServ = async id => {
    if (id !== '') {
      console.log(servicosRealizados.length + 1);
      try {
        const newServ = await api.get(`/service/${id}`);
        console.log(newServ.data);
        setServicosRealizados([...servicosRealizados, newServ.data]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const removeServ = index => {
    const newList = [...servicosRealizados];
    newList.splice(index, 1);
    setServicosRealizados(newList);
  };

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
  }, [getServices, getEmployees, getCustomers, entryId, servicosRealizados]);

  const defaultValues = {
    comissao: employees.length ? employees[0].comissionRate : '',
    servico: entry && entry.service ? entry.service.id : '',
  };

  // const ComboFuncionarios = () => {
  //   const { values, handleChange, setFieldValue } = useFormikContext();
  //   useEffect(() => {
  //     async function attComissao() {
  //       if (values.funcionario && values.funcionario !== '') {
  //         const comissao = await loadComission(values.funcionario);
  //         console.log(comissao);
  //         setFieldValue('comissao', comissao);
  //       }
  //     }

  //     attComissao();
  //   }, [values.funcionario]);
  //   return (
  //     <Combobox
  //       label="Funcionário"
  //       name="funcionario"
  //       onChange={async e => {
  //         handleChange(e);
  //       }}
  //       value={values.funcionario}
  //       options={employees}
  //     />
  //   );
  // };

  return (
    <Formik
      enableReinitialize
      validationSchema={formSchema}
      onSubmit={(values, { resetForm }) => {
        entry
          ? props.setSubmit(values, entry.id)
          : props.setSubmit(values, resetForm);
      }}
      initialValues={defaultValues}
    >
      {({
        handleSubmit,
        handleChange,
        values,
        errors,
        touched,
        setFieldValue,
      }) => (
        <Modal
          show={modalForm}
          onHide={handleClose}
          backdrop="static"
          size="lg"
        >
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
              {/* <ComboFuncionarios /> */}
              <Combobox
                label="Funcionário"
                name="funcionario"
                onChange={async e => {
                  handleChange(e);
                  setFieldValue(
                    'comissao',
                    await loadComission(e.target.value)
                  );
                }}
                value={values.funcionario}
                options={employees}
              />
              <hr />
              <CustomCombo
                className="cbwbuton"
                label="Serviço"
                name="servico"
                onChange={handleChange}
                value={values.servico}
                options={services}
              >
                <Button
                  variant="outline-primary"
                  onClick={() => addServ(values.servico)}
                >
                  <i className="fa fa-plus-circle" />
                </Button>
              </CustomCombo>

              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Serviço realizado</th>
                    <th>Valor</th>
                    <th>Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {servicosRealizados.map((serv, index) => (
                    <tr
                      // eslint-disable-next-line react/no-array-index-key
                      key={`servicosRealizados-${index}`}
                      id={`servicosRealizados-${index}`}
                    >
                      <td>{serv.name}</td>
                      <td>
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        }).format(serv.price)}
                      </td>
                      <td>
                        <BtRemoveItem
                          variant="outline-danger"
                          onClick={() => removeServ(index)}
                        >
                          <i className="fa fa-minus-circle" />
                        </BtRemoveItem>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <input
                type="hidden"
                name="services"
                value={servicosRealizados.map(item => item.id)}
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
                value={servicosRealizados
                  .map(item => item.price)
                  .reduce((a, b) => a + b, 0)
                  .toString()
                  .replace('.', ',')}
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
