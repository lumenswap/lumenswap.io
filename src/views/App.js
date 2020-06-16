import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { homePage, exchangePage, modalPage } from '../constants/routes';
import Home from './Home';
import Exchange from './Exchange';
import ModalPage from './ModalPage';
import 'rc-switch/assets/index.css';
import 'src/styles/base.less';

export default () => (
  <Switch>
    <Route path={homePage} exact component={Home} />
    <Route path={exchangePage} exact component={Exchange} />
    <Route path={modalPage} exact component={ModalPage} />
  </Switch>
);
