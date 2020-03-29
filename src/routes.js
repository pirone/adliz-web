import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import ServiceCatList from './pages/ServiceCategory/List';
import Service from './pages/Service/List';
import Main from './pages/Main';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/servicecategory" component={ServiceCatList} />
        <Route path="/services" component={Service} />
      </Switch>
    </BrowserRouter>
  );
}
