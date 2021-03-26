import { ReactComponent as Logo } from 'assets/images/logo.svg';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

const Header = () => (
  <div className={styles.layout}>
    <ul className={styles.list}>
      <li><Link to="/"><Logo /></Link></li>
      <li><Link to="/">Swap</Link></li>
      <li><Link to="/">Stats</Link></li>
    </ul>
  </div>
);

export default Header;
