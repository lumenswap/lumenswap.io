import { Tabs, Tab } from 'react-bootstrap';
import { useState } from 'react';
import styles from './styles.module.scss';

const CTabs = ({
  tabs, tabContent: TabContent, onChange = () => {}, setOrderCounter, customTabProps,
}) => {
  const [currentTab, setCurrentTab] = useState();

  return (
    <div
      className={styles.tab}
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
