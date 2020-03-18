import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import ServiceCategory from './pages/ServiceCategory';
import ServiceCatList from './pages/ServiceCategory/List';
import Main from './pages/Main';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/servicecategory" component={ServiceCategory} />
        <Route path="/listsc" component={ServiceCatList} />
      </Switch>
    </BrowserRouter>
  );
}
