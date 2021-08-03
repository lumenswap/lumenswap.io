import { Tabs, Tab } from 'react-bootstrap';
import styles from './styles.module.scss';

const CTabs = ({
  tabs, tabContent: TabContent, onChange,
}) => {
  const defaultOnChange = () => {};
  return (
    <div
      className={styles.tab}
      onSelect={onChange ?? defaultOnChange}
      style={{ fontSize: '14px' }}
    >
      <Tabs defaultActiveKey={tabs[0].id}>
        {tabs.map((tab, index) => (
          <Tab eventKey={tab.id} title={tab.title} key={index}>
            <TabContent tab={tab} />
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};

export default CTabs;
