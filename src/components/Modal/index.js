import React from 'react';

import PropTypes from 'prop-types';

import { Section } from './styles';

const Modal = ({ title, content, show, close }) => (
  <Section visible={show}>
    <div className="modal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1>{title}</h1>
            <button type="button" className="close" onClick={close}>
              X
            </button>
          </div>
          <div className="modal-body">
            <p>{content}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="Close" onClick={close}>
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  </Section>
);

Modal.propTypes = {
  show: PropTypes.bool,
  close: PropTypes.func.isRequired,
  title: PropTypes.string,
  content: PropTypes.string.isRequired,
};

Modal.defaultProps = {
  show: false,
  title: 'Mensagem',
};

export default Modal;
