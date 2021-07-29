import { ReactComponent as Logo } from 'assets/images/logo.svg';
import Link from 'next/link';
import classNames from 'classnames';
import CustomDropdown from 'components/Dropdown';
import Button from 'components/Button';
import { useSelector } from 'react-redux';
import { openConnectModal } from 'actions/modal';
import LSP from 'tokens/LSP';
import getAssetDetails from 'helpers/getAssetDetails';
import isSameAsset from 'helpers/isSameAsset';
import numeral from 'numeral';
import sevenDigit from 'helpers/sevenDigit';
import styles from './styles.module.scss';

const Header = () => {
  const isLogged = useSelector((state) => state.user.logged);
  const userLSPBalance = useSelector((state) => state.userBalance)
    .find((balance) => isSameAsset(getAssetDetails(balance.asset), getAssetDetails(LSP)));

  return (
    <div className={classNames(styles.layout, 'layout')}>
      <ul className={styles.list}>
        <li><Link href="/"><Logo /></Link></li>
        {/* <li><NavLink activeClassName={styles['active-link']} to="/swap">Swap</NavLink></li> */}
        <li><Link href="/swap"><a>Swap</a></Link></li>
        {/* <li><NavLink activeClassName={styles['active-link']} to="/spot">Spot</NavLink></li> */}
        <li><Link href="/spot"><a>Ppot</a></Link></li>
        {/* <li>
          <NavLink activeClassName={styles['active-link']} to="/auction">
            <span className="d-flex align-items-center"> LSP Auction <span className={styles['active-status']} /></span>
          </NavLink>
        </li> */}
        <li><Link href="/auction"><a>LSP Auction</a></Link></li>

        {/* <span className="icon-external" /> */}
      </ul>
      {isLogged && <div className={styles.lsp}>{numeral(sevenDigit(userLSPBalance?.balance || 0)).format('0,0.[0000000]')} LSP</div>}
      {isLogged ? <CustomDropdown height="40px" width="160px" />
        : <Button variant="secondary" content="Connect Wallet" fontWeight={500} className={styles.btn} onClick={openConnectModal} /> }
    </div>
  );
};

export default Header;
