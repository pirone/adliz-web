import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import ServiceCategory from './pages/ServiceCategory';
import Main from './pages/Main';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/servicecategory" component={ServiceCategory} />
      </Switch>
    </BrowserRouter>
  );
}
