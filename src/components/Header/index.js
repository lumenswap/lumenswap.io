import { ReactComponent as Logo } from 'assets/images/logo.svg';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import CustomDropdown from 'components/Dropdown';
import Button from 'components/Button';
import { useSelector } from 'react-redux';
import { openConnectModal } from 'actions/modal';
import styles from './styles.module.scss';

const Header = () => {
  const isLogged = useSelector((state) => state.user.logged);

  return (
    <div className={classNames(styles.layout, 'layout')}>
      <ul className={styles.list}>
        <li><Link to="/"><Logo /></Link></li>
        <li><Link to="/">Swap</Link></li>
        <li><Link to="/">Stats <span className="icon-external" /></Link></li>
      </ul>
      {isLogged ? <CustomDropdown height="40px" width="160px" />
        : <Button variant="secondary" content="Connect Wallet" fontWeight={500} className={styles.btn} onClick={openConnectModal} /> }
    </div>
  );
};

export default Header;
