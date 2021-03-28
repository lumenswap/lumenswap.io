import { ReactComponent as Logo } from 'assets/images/logo.svg';
import { Link } from 'react-router-dom';
import CustomDropdown from 'components/Dropdown';
import Button from 'components/Button';
import styles from './styles.module.scss';

const Header = () => (
  <div className={styles.layout}>
    <ul className={styles.list}>
      <li><Link to="/"><Logo /></Link></li>
      <li><Link to="/">Swap</Link></li>
      <li><Link to="/">Stats <span className="icon-external" /></Link></li>
    </ul>
    {/* connected */}
    {/* <CustomDropdown height="40px" width="160px" /> */}
    {/* not connected */}
    <Button variant="secondary" content="Connect Wallet" className={styles.btn} />
  </div>
);

export default Header;
