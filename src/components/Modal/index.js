import React from 'react';

import PropTypes from 'prop-types';

import { Modal, Button } from 'react-bootstrap';

export const InfoModal = ({ show, title, content, onHide }) => (
  <Modal
    show={show}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    onHide={onHide}
    centered
    backdrop="static"
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>{show === true ? content : 'Aguardando resultado...'}</p>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={onHide}>Fechar</Button>
    </Modal.Footer>
  </Modal>
);

InfoModal.propTypes = {
  show: PropTypes.bool,
  title: PropTypes.string,
  content: PropTypes.string,
  onHide: PropTypes.func.isRequired,
};

InfoModal.defaultProps = {
  show: false,
  title: 'Mensagem',
};

export const ConfirmDialog = ({ show, title, content, onHide, confirm }) => (
  <Modal
    show={show}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    onHide={onHide}
    centered
    backdrop="static"
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>{content}</p>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onHide}>
        Não
      </Button>
      <Button variant="primary" onClick={confirm}>
        Sim
      </Button>
    </Modal.Footer>
  </Modal>
);
