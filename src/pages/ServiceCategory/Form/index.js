/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
import React from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { TextInput } from '../../../components/Form';

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
                errors={[errors.nome, touched.nome]}
              />
              <TextInput
                label="Descriçaõ"
                placeholder="Ex.: Penteados de cabelo"
                name="descricao"
                value={values.descricao}
                onChange={handleChange}
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
