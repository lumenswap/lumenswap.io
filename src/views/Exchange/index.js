import React, { useState } from 'react';
import classNames from 'classnames';
import {
  TabContent, TabPane, Nav, NavItem, NavLink,
} from 'reactstrap';
import { useSelector } from 'react-redux';
import styles from './styles.less';
import Swap from './Swap';
import Send from './Send';
import Advanced from './Advanced';

const Exchange = () => {
  const showAdvanced = useSelector((state) => state.checkout.showAdvanced);
  const [activeTab, setActiveTab] = useState('swap');

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
                    onClick={() => { toggle('swap'); }}
                  >
                    Swap
                  </NavLink>
                </NavItem>
                <NavItem>
                  {/* onClick={() => { toggle('send'); }} */}
                  <NavLink
                    style={{ cursor: 'not-allowed' }}
                    className={classNames({ active: activeTab === 'send' })}
                  >
                    Send <span style={{ fontSize: '11px' }}>(soon)</span>
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
        {showAdvanced && (
        <div className="row justify-content-center mt-2 pt-2 pb-5">
          <div className={classNames('col-auto', styles['box-size'])}>
            <Advanced />
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

Exchange.propTypes = {

};

export default Exchange;
