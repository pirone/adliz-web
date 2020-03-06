import React from 'react';
import PropTypes from 'prop-types';

import { InputBoostrap } from './styles';

const Input = ({ label, id, onChange, value }) => (
  <InputBoostrap>
    <label htmlFor={id}>{label}:</label>
    <input id={id} onChange={onChange} value={value} />
  </InputBoostrap>
);

Input.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string.isRequired,
};

export default Input;
