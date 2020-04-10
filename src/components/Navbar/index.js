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
          <a href="/categoriasServico" className="nav-link">
            <i className="fa fa-address-card" />
            Categorias de Serviço
          </a>
        </li>
        <li className="nav-item">
          <a href="/servicos" className="nav-link">
            <i className="fa fa-cubes" />
            Serviços
          </a>
        </li>
        <li className="nav-item">
          <a href="/clientes" className="nav-link">
            <i className="fa fa-picture-o" />
            Clientes
          </a>
        </li>
        <li className="nav-item">
          <a href="/empregados" className="nav-link">
            <i className="fa fa-picture-o" />
            Empregados
          </a>
        </li>
      </ul>
    </Nav>
  );
}
