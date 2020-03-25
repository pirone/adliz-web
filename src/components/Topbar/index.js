/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';

import { Header } from './styles';

export default function Topbar(props) {
  return (
    <Header>
      <button id="menu" title="Menu" type="button" onClick={props.handleNavBar}>
        <i className="fa fa-bars fa-2x" />
      </button>
    </Header>
  );
}
