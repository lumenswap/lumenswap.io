import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { orderPages, homePage } from 'src/constants/routes';
import BaseLayout from 'src/shared/components/Layout/BaseLayout';
import Orders from './Orders';
import Exchange from './Exchange';
import Modal from './Modal';
import 'rc-switch/assets/index.css';
import 'src/styles/base.scss';

export default () => (
  <BaseLayout>
    <Modal />
    <Switch>
      <Route path={orderPages} exact component={Orders} />
      <Route path="/send" exact component={Exchange} />
      <Route path="/swap" exact component={Exchange} />
      <Route path={homePage} exact component={() => <Redirect to="/swap" />} />
    </Switch>
  </BaseLayout>
);
