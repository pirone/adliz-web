import React from 'react';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import pt from 'date-fns/locale/pt';

import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

import { Form, InputGroup } from 'react-bootstrap';

registerLocale('pt', pt);
setDefaultLocale('pt');

const brlMaskOptions = {
  prefix: '',
  suffix: '',
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: '.',
  allowDecimal: true,
  decimalSymbol: ',',
  decimalLimit: 2, // how many digits allowed after the decimal
  integerLimit: 9, // limit length of integer numbers
  allowNegative: false,
  allowLeadingZeroes: false,
};

const percentMaskOptions = {
  prefix: '',
  suffix: '',
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: '.',
  allowDecimal: true,
  decimalSymbol: ',',
  decimalLimit: 2, // how many digits allowed after the decimal
  integerLimit: 3, // limit length of integer numbers
  allowNegative: false,
  allowLeadingZeroes: false,
};

const brlMask = createNumberMask(brlMaskOptions);
const percentMask = createNumberMask(percentMaskOptions);

const handleValid = errors => {
  let className = '';
  if (errors) {
    if (errors[0]) {
      className = ' is-invalid';
    }
    if (!errors[0] && errors[1]) {
      className = ' is-valid';
    }
  }
  return className;
};

export function DateComponent({
  label,
  name,
  value,
  errors,
  onChange,
  setFieldValue,
}) {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <InputGroup>
        <DatePicker
          name={name}
          className={`form-control${handleValid(errors)}`}
          onChange={date => setFieldValue(name, date)}
          dateFormat="dd/MM/yyyy"
          selected={
            (value && new Date(moment(value, 'DD/MM/YYYY').toDate())) || null
          }
        />
      </InputGroup>
    </Form.Group>
  );
}

export function TextInput({
  label,
  name,
  placeholder,
  value,
  onChange,
  errors,
}) {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        className={handleValid(errors)}
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <Form.Control.Feedback type="invalid">{errors}</Form.Control.Feedback>
    </Form.Group>
  );
}

export function MoneyInput({ label, name, onChange, value, errors }) {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text id="inputGroupPrepend">R$</InputGroup.Text>
        </InputGroup.Prepend>
        <MaskedInput
          className={`form-control${handleValid(errors)}`}
          mask={brlMask}
          name={name}
          onChange={onChange}
          value={value}
        />
        <Form.Control.Feedback type="invalid">{errors}</Form.Control.Feedback>
      </InputGroup>
    </Form.Group>
  );
}

export function PercentInput({ label, name, onChange, value, errors }) {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text id="inputGroupPrepend">%</InputGroup.Text>
        </InputGroup.Prepend>
        <MaskedInput
          className={`form-control percent${handleValid(errors)}`}
          mask={percentMask}
          name={name}
          onChange={onChange}
          value={value}
        />
        <Form.Control.Feedback type="invalid">{errors}</Form.Control.Feedback>
      </InputGroup>
    </Form.Group>
  );
}

export function PhoneInput({ label, name, onChange, value, errors }) {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <InputGroup>
        <MaskedInput
          className={`form-control${handleValid(errors)}`}
          mask={[
            '(',
            /\d/,
            /\d/,
            ')',
            ' ',
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            '-',
            /\d/,
            /\d/,
            /\d/,
            /\d/,
          ]}
          name={name}
          onChange={onChange}
          value={value}
          showMask="true"
          guide="false"
        />
        <Form.Control.Feedback type="invalid">{errors}</Form.Control.Feedback>
      </InputGroup>
    </Form.Group>
  );
}

export function Combobox({ label, name, onChange, options, value }) {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        as="select"
        custom="true"
        name={name}
        onChange={onChange}
        value={value}
      >
        {options.map(opt => (
          <option key={opt.id} value={opt.id}>
            {opt.name}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );
}

export function CpfInput({ label, errors, onChange, name, value }) {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <InputGroup>
        <MaskedInput
          className={`form-control${handleValid(errors)}`}
          mask={[
            /\d/,
            /\d/,
            /\d/,
            '.',
            /\d/,
            /\d/,
            /\d/,
            '.',
            /\d/,
            /\d/,
            /\d/,
            '-',
            /\d/,
            /\d/,
          ]}
          name={name}
          onChange={onChange}
          value={value}
          showMask="true"
          guide="false"
        />
        <Form.Control.Feedback type="invalid">{errors}</Form.Control.Feedback>
      </InputGroup>
    </Form.Group>
  );
}
