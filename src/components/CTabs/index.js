import { Tabs, Tab } from 'react-bootstrap';
import { useState } from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';

const CTabs = ({
  tabs, tabContent: TabContent, onChange = () => {}, customTabProps, className,
}) => {
  const [currentTab, setCurrentTab] = useState(tabs[0].id);

  return (
    <div
      className={classNames(styles.tab, className)}
      onSelect={onChange}
      style={{ fontSize: '14px' }}
    >
      <Tabs
        defaultActiveKey={tabs[0].id}
        onSelect={(newTab) => {
          setCurrentTab(newTab);
          onChange(newTab);
        }}
      >
        {tabs.map((tab, index) => (
          <Tab eventKey={tab.id} title={tab.title} key={index} />
        ))}
      </Tabs>
      <TabContent
        tab={currentTab}
        {...customTabProps}
      />
    </div>
  );
};

export default CTabs;
