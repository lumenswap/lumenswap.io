import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { orderPages, homePage, modalPage } from 'src/constants/routes';
import BaseLayout from 'src/shared/components/Layout/BaseLayout';
import Orders from './Orders';
import Exchange from './Exchange';
import ModalPage from './ModalPage';
import Modal from './Modal';
import 'rc-switch/assets/index.css';
import 'src/styles/base.less';

export default () => (
  <BaseLayout>
    <Modal />
    <Switch>
      <Route path={orderPages} exact component={Orders} />
      <Route path={homePage} exact component={Exchange} />
      <Route path={modalPage} exact component={ModalPage} />
      <Route path="/:fromCustomAsset/:toCustomAsset" exact component={Exchange} />
    </Switch>
  </BaseLayout>
);
