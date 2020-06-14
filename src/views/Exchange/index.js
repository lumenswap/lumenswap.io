import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  TabContent, TabPane, Nav, NavItem, NavLink,
} from 'reactstrap';
import BaseLayout from 'Root/shared/components/Layout/BaseLayout';
import styles from './styles.less';
import Swap from './Swap';
import Send from './Send';

const Exchange = (props) => {
  const [activeTab, setActiveTab] = useState('swap');

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <BaseLayout connectWallet>
      <div className="row justify-content-center h-100 align-items-center">
        <div className="col-xl-3 col-lg-5 col-md-7 col-sm-8 col-11 px-0">
          <div className={classNames('shadow-card', styles.card)}>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classNames({ active: activeTab === 'swap' })}
                  onClick={() => { toggle('swap'); }}
                >
               Swap
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classNames({ active: activeTab === 'send' })}
                  onClick={() => { toggle('send'); }}
                >
               Send
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="swap">
                <Swap />
              </TabPane>
              <TabPane tabId="send">
                <Send />
              </TabPane>
            </TabContent>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

Exchange.propTypes = {

};

export default Exchange;
