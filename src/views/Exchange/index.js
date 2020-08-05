import React, { useState } from 'react';
import classNames from 'classnames';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import styles from './styles.module.scss';
import Swap from './Swap';
import Send from './Send';
import Advanced from './Advanced';

const Exchange = () => {
  const [activeTab, setActiveTab] = useState('send');

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div className="row h-100 align-items-center">
      <div className="col-12">
        <div className="row justify-content-center">
          <div className={classNames('col-auto', styles['box-size'])}>
            <div className={classNames('shadow-card', styles.card)}>
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classNames({ active: activeTab === 'swap' })}
                    onClick={() => {
                      toggle('swap');
                    }}
                  >
                    Swap
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classNames({ active: activeTab === 'send' })}
                    onClick={() => {
                      toggle('send');
                    }}
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
        <div className="row justify-content-center mt-2 pt-2 pb-5">
          <div className={classNames('col-auto', styles['box-size'])}>
            <Advanced />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exchange;
