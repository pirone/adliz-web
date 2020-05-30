/* eslint-disable react/prop-types */
import React, {
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
} from 'react';
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
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [valorTotal, setValorTotal] = useState(0);
  const [servicosRealizados, setServicosRealizados] = useState([]);

  const formSchema = Yup.object().shape({
    total: Yup.string().required('Campo Obrigatório.'),
    services: Yup.string().required('Pelo menos um serviço deve ser informado'),
    comissao: Yup.string().required('Campo Obrigatório'),
    cliente: Yup.string().required('Campo Obrigatório'),
    funcionario: Yup.string().required('Campo Obrigatório'),
  });

  const { entryId, handleClose, modalForm } = props;

  const toBRL = number => {
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    return formatter.format(number);
  };

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
        return response.data.comissionRate;
      })
      .catch(error => console.log(error));
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

  const getFormasPagamento = useCallback(() => {
    api
      .get(`/paymentMethod/all/`)
      .then(result => {
        setPaymentMethods(result.data.content);
      })
      .catch(error => {
        console.log(error.message);
      });
  }, []);

  useEffect(() => {
    getServices();
    getEmployees();
    getCustomers();
    getFormasPagamento();
    if (typeof entryId !== 'undefined') {
      getEntry(entryId);
    }
  }, [entryId]);

  const customReset = () => {
    setServicosRealizados([]);
  };

  const defaultValues = {
    comissao: employees.length ? employees[0].comissionRate : '',
    servico: entry && entry.service ? entry.service.id : '',
    total: servicosRealizados.length ? valorTotal : '0',
    services: servicosRealizados.length
      ? servicosRealizados.map(item => item.id)
      : '',
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

  const InputTotal = () => {
    const { values, errors, touched } = useFormikContext();
    return (
      <MoneyInput
        readOnly="true"
        label="Preço *"
        name="total"
        value={new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(values.total)}
        errors={[errors.total, touched.total]}
      />
    );
  };

  const ComboServicos = () => {
    const { values, handleChange, setFieldValue } = useFormikContext();

    const servArrayId = servicosRealizados.map(serv => serv.id);

    const funcionarioSelecionado = values.funcionario;

    const addServ = async id => {
      console.log(funcionarioSelecionado);
      if (id !== '' && !servArrayId.includes(id)) {
        try {
          const newServ = await api.get(`/service/${id}`);
          await setServicosRealizados([...servicosRealizados, newServ.data]);
          setFieldValue('total', Number(values.total) + newServ.data.price);
        } catch (error) {
          console.log(error);
        }
      }
    };

    return (
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
          onClick={e => {
            e.preventDefault();
            addServ(values.servico);
            setFieldValue('services', [...values.services, values.servico]);
            setFieldValue(
              'total',
              servicosRealizados
                .map(item => item.price)
                .reduce((a, b) => a + b, 0)
                .toString()
                .replace('.', ',')
            );
          }}
        >
          <i className="fa fa-plus-circle" />
        </Button>
      </CustomCombo>
    );
  };

  const TableServicosRealizados = () => {
    const { values, setFieldValue, setValues } = useFormikContext();

    useEffect(() => {
      if (entry.id) {
        setFieldValue('cliente', entry.customer.id);
        setFieldValue('funcionario', entry.employee.id);
        setFieldValue('comissao', entry.comission);
        setFieldValue('total', entry.record.value);
        setFieldValue('formaPagamento', entry.paymentMethod.id);
        setServicosRealizados(entry.services);
        setFieldValue(
          'services',
          entry.services.map(service => service.id)
        );
        // entry.services.map(item =>
        //   setServicosRealizados([...servicosRealizados, item])
        // );
      }
    }, []);

    const removeServ = index => {
      setFieldValue(
        'total',
        Number(values.total) - servicosRealizados[index].price
      );
      const newList = [...servicosRealizados];
      newList.splice(index, 1);
      setServicosRealizados(newList);
    };

    return (
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
                  onClick={() => {
                    removeServ(index);
                  }}
                >
                  <i className="fa fa-minus-circle" />
                </BtRemoveItem>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  return (
    <Formik
      validationSchema={formSchema}
      onSubmit={(values, { resetForm }) => {
        entry.id
          ? props.setSubmit(values, entry.id, resetForm)
          : props.setSubmit(values, resetForm, customReset);
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
                errors={errors.cliente}
                options={customers}
              />
              {/* <ComboFuncionarios /> */}
              <Combobox
                label="Funcionário"
                name="funcionario"
                errors={errors.funcionario}
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
              <ComboServicos />

              <TableServicosRealizados />

              <Form.Group>
                <input name="services" value={values.services} />
                <Form.Control.Feedback type="invalid" className="visible">
                  {errors.services}
                </Form.Control.Feedback>
              </Form.Group>
              <PercentInput
                label="Comissão"
                name="comissao"
                value={values.comissao}
                onChange={handleChange}
                errors={[errors.comissao, touched.comissao]}
              />
              <InputTotal />
              <Combobox
                label="Forma de Pagamento"
                name="formaPagamento"
                onChange={handleChange}
                value={values.formaPagamento}
                errors={errors.formaPagamento}
                options={paymentMethods}
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
