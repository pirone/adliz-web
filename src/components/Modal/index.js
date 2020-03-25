import React from 'react';

import PropTypes from 'prop-types';

import { Modal, Button } from 'react-bootstrap';

const Modalz = ({ show, title, content, onHide }) => (
  <Modal
    show={show}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    onHide={onHide}
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>{content}</p>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={onHide}>Close</Button>
    </Modal.Footer>
  </Modal>
);

Modalz.propTypes = {
  show: PropTypes.bool,
  title: PropTypes.string,
  content: PropTypes.string,
  onHide: PropTypes.func.isRequired,
};

Modalz.defaultProps = {
  show: false,
  title: 'Mensagem',
};

export default Modalz;
