// import { Fragment } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import styles from './styles.module.scss';

const CustomTabs = ({ tabs, activeTabId }) => (
  <div className={styles.tab}>
    <Tabs defaultActiveKey={activeTabId}>
      {tabs.map((tab, index) => (
        <Tab eventKey={tab.id} title={tab.title} key={index}>
          {tab.content}
        </Tab>
      ))}
    </Tabs>
  </div>
);

export default CustomTabs;
