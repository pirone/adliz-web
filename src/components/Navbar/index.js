/* eslint-disable react/prefer-stateless-function */
import React from 'react';

import { Nav } from './styles';

export default function Menu(props) {
  return (
    <Nav show={props.handleNavBar}>
      <ul className="nav flex-column">
        <li className="nav-item">
          <a href="/" className="nav-link">
            <i className="fa fa-th-large" />
            Home
          </a>
        </li>
        <li className="nav-item">
          <a href="/serviceCategory" className="nav-link">
            <i className="fa fa-address-card" />
            Categorias de Serviço
          </a>
        </li>
        <li className="nav-item">
          <a href="/listsc" className="nav-link">
            <i className="fa fa-cubes" />
            Services
          </a>
        </li>
        <li className="nav-item">
          <a href="/" className="nav-link">
            <i className="fa fa-picture-o" />
            Gallery
          </a>
        </li>
      </ul>
    </Nav>
  );
}
