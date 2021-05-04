import { Tabs, Tab } from 'react-bootstrap';
import styles from './styles.module.scss';

const CustomTabs = () => (
  <div className={styles.tab}>
    <Tabs defaultActiveKey="home">
      <Tab eventKey="home" title="Home">
        1
      </Tab>
      <Tab eventKey="profile" title="Profile">
        2
      </Tab>
      <Tab eventKey="contact" title="Contact">
        3
      </Tab>
    </Tabs>
  </div>
);

export default CustomTabs;
