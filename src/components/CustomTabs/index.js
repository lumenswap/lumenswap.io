import { Tabs, Tab } from 'react-bootstrap';
import styles from './styles.module.scss';

const CustomTabs = ({
  tabs, activeTabId, fontSize, onChange, tabContent: TabContent,
}) => (
  <div className={styles.tab} style={{ fontSize: `${fontSize}px` }}>
    <Tabs defaultActiveKey={activeTabId} onSelect={onChange}>
      {tabs.map((tab, index) => (
        <Tab eventKey={tab.id} title={tab.title} key={index}>
          <TabContent />
        </Tab>
      ))}
    </Tabs>
  </div>
);

export default CustomTabs;
