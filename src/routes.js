import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import ServiceCatList from './pages/ServiceCategory/List';
import Service from './pages/Service/List';
import Customer from './pages/Customer/List';
import Employee from './pages/Employee/List';
import Main from './pages/Main';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/categoriasServico" component={ServiceCatList} />
        <Route path="/servicos" component={Service} />
        <Route path="/clientes" component={Customer} />
        <Route path="/empregados" component={Employee} />
      </Switch>
    </BrowserRouter>
  );
}
