import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { homePage, exchangePage } from '../constants/routes';
import Home from './Home';
import Exchange from './Exchange';
import '../../node_modules/rc-switch/assets/index.css';
import 'Root/styles/base.less';

export default () => (
  <Switch>
    <Route path={homePage} exact component={Home} />
    <Route path={exchangePage} exact component={Exchange} />
  </Switch>
);
