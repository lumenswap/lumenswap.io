import { Tabs, Tab } from 'react-bootstrap';
import styles from './styles.module.scss';

const CustomTabs = ({ tabs, activeTabId, fontSize }) => (
  <div className={styles.tab} style={{ fontSize: `${fontSize}px` }}>
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
