import { ReactComponent as Logo } from 'assets/images/logo.svg';
import { Link } from 'react-router-dom';
import CustomDropdown from 'components/Dropdown';
import styles from './styles.module.scss';

const items = [
  { label: 'Copy address', value: '2' },
  { label: 'Open in lumenscan', value: '3' },
  { label: 'Disconnect', value: '1' },
];

const Header = () => (
  <div className={styles.layout}>
    <ul className={styles.list}>
      <li><Link to="/"><Logo /></Link></li>
      <li><Link to="/">Swap</Link></li>
      <li><Link to="/">Stats <span className="icon-external" /></Link></li>
    </ul>
    <CustomDropdown height="40px" width="160px" items={items} />
  </div>
);

export default Header;
