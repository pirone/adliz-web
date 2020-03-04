import React from 'react';
import PropTypes from 'prop-types';

import { InputBoostrap } from './styles';

const Input = ({ label, id, onChange }) => (
  <InputBoostrap>
    <label htmlFor={id}>{label}:</label>
    <input id={id} onChange={onChange} />
  </InputBoostrap>
);

Input.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

export default Input;
