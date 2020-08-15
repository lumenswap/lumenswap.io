import React, { useState } from 'react';
import classNames from 'classnames';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import styles from './styles.module.scss';
import Swap from './Swap';
import Send from './Send';
import Advanced from './Advanced';

const Exchange = () => {
  const [activeTab, setActiveTab] = useState('swap');
  const [showAdvanced, setShowAdvanced] = useState(true);

  const toggle = (tab) => {
    if (tab === 'send') {
      setShowAdvanced(false);
    } else {
      setShowAdvanced(true);
    }

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
                    className={classNames((activeTab === 'swap') && styles.active)}
                    onClick={() => {
                      toggle('swap');
                    }}
                  >
                    Swap
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classNames((activeTab === 'send') && styles.active)}
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
                  <Swap
                    setShowAdvanced={setShowAdvanced}
                    showAdvanced={showAdvanced}
                  />
                </TabPane>
                <TabPane tabId="send">
                  <Send
                    setShowAdvanced={setShowAdvanced}
                    showAdvanced={showAdvanced}
                  />
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

export default Exchange;
