import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

import api from '../../services/api';
import Modalz from '../../components/Modal';

import { Container } from './styles';

const formSchema = Yup.object().shape({
  nome: Yup.string().required('Campo Obrigatório.'),
});

export default function ServiceCatList() {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState();

  const setSubmit = values => {
    const serviceCategory = {
      name: values.nome,
      description: values.descricao,
    };

    api
      .post(`/serviceCategory`, serviceCategory)
      .then(res => {
        console.log(res.status);
        setModalContent(res.data);
      })
      .catch(error => {
        if (!error.response) {
          // network error
          setModalContent(
            'Ocorreu um erro de conexão com o servidor. Por favor contacte um administrador.'
          );
        } else {
          setModalContent(error.response.data.message);
        }
      });

    setShowModal(true);
  };

  return (
    <Formik
      initialValues={{ nome: '', descricao: '' }}
      validationSchema={formSchema}
      onSubmit={(values, { resetForm }) => {
        setSubmit(values);
        resetForm();
      }}
    >
      {({ handleSubmit, handleChange, values, errors, touched }) => (
        <Container>
          <Form onSubmit={handleSubmit}>
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
            <Button variant="primary" type="submit">
              Enviar
            </Button>
          </Form>
          <Modalz
            show={showModal}
            title="Teste"
            content={modalContent}
            onHide={() => setShowModal(false)}
          />
        </Container>
      )}
    </Formik>
  );
}
