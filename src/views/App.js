import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import 'Root/styles/base.less';

export default () => (
  <Switch>
    <Route path="/" exact component={Home} />
  </Switch>
);
