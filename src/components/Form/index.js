import React from 'react';
import InputMask from 'react-input-mask';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

import { Form, InputGroup } from 'react-bootstrap';

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

const brlMask = createNumberMask(brlMaskOptions);

const handleValid = props => {
  const { errors } = props;
  let className = '';
  console.log(errors);
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

export function DateInput(props) {
  return (
    <Form.Group>
      <Form.Label>{props.label}</Form.Label>
      <InputGroup>
        <InputMask
          className={`form-control${handleValid(props)}`}
          mask="99/99/9999"
          name={props.name}
          onChange={props.onChange}
          value={props.value}
        />
        <Form.Control.Feedback type="invalid">
          {props.errors}
        </Form.Control.Feedback>
      </InputGroup>
    </Form.Group>
  );
}

export function TextInput(props) {
  return (
    <Form.Group>
      <Form.Label>{props.label}</Form.Label>
      <Form.Control
        className={handleValid(props)}
        type="text"
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
      <Form.Control.Feedback type="invalid">
        {props.errors}
      </Form.Control.Feedback>
    </Form.Group>
  );
}

export function MoneyInput(props) {
  return (
    <Form.Group>
      <Form.Label>{props.label}</Form.Label>
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text id="inputGroupPrepend">R$</InputGroup.Text>
        </InputGroup.Prepend>
        <MaskedInput
          className={`form-control${handleValid(props)}`}
          mask={brlMask}
          name={props.name}
          onChange={props.onChange}
          value={props.value}
        />
        <Form.Control.Feedback type="invalid">
          {props.errors}
        </Form.Control.Feedback>
      </InputGroup>
    </Form.Group>
  );
}

export function Combobox(props) {
  return (
    <Form.Group>
      <Form.Label>{props.label}</Form.Label>
      <Form.Control
        as="select"
        custom="true"
        name={props.name}
        onChange={props.onChange}
        value={props.value}
      >
        {props.options.map(opt => (
          <option key={opt.id} value={opt.id}>
            {opt.name}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );
}
