/* eslint-disable react/prop-types */
import React from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

export default function FormServiceCat(props) {
  const formSchema = Yup.object().shape({
    nome: Yup.string().required('Campo Obrigatório.'),
  });

  const { serviceCategory, handleClose, modalForm } = props;

  return (
    <Formik
      enableReinitialize
      initialValues={{
        nome: serviceCategory ? serviceCategory.name : '',
        descricao: serviceCategory ? serviceCategory.description : '',
      }}
      validationSchema={formSchema}
      onSubmit={(values, { resetForm }) => {
        serviceCategory
          ? props.setSubmit(values, serviceCategory.id)
          : props.setSubmit(values);
        resetForm();
      }}
    >
      {({ handleSubmit, handleChange, values, errors, touched }) => (
        <Modal show={modalForm} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Incluir</Modal.Title>
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
