import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { homePage, swapPage } from '../constants/routes';
import Home from './Home';
import Swap from './Swap';
import 'Root/styles/base.less';

export default () => (
  <Switch>
    <Route path={homePage} exact component={Home} />
    <Route path={swapPage} exact component={Swap} />
  </Switch>
);
