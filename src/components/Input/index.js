import React from 'react';
import PropTypes from 'prop-types';

import { InputBoostrap } from './styles';

const Input = ({ label, id, onChange, value, required }) => (
  <InputBoostrap>
    <label htmlFor={id}>{label}:</label>
    <input
      id={id}
      onChange={onChange}
      value={value}
      required={required}
      onInvalid="this.setCustomValidity('Campo obrigatório.')"
    />
  </InputBoostrap>
);

Input.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  required: PropTypes.bool,
};

Input.defaultProps = {
  required: false,
};
export default Input;
