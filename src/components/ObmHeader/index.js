import Logo from 'assets/images/logo';
import Link from 'next/link';
import urlMaker from 'helpers/urlMaker';
import classNames from 'classnames';
import CustomDropdown from 'components/Dropdown';
import Button from 'components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { openConnectModal } from 'actions/modal';
import NavLink from 'components/NavLink';
import styles from './styles.module.scss';

const ObmHeader = () => {
  const isLogged = useSelector((state) => state.user.logged);
  const dispatch = useDispatch();

  return (
    <div className={classNames(styles.layout, 'layout')}>
      <ul className={styles.list}>
        <div>
          <li><Link href={urlMaker.root()}><a><Logo /></a></Link></li>
          <li><NavLink name="Market" href={urlMaker.market.root()} /></li>
          <li><NavLink name="Swap" href={urlMaker.swap.root()} /></li>
          <li><NavLink
            name="Spot"
            mainHref={urlMaker.spot.root()}
            href={urlMaker.spot.tokens('XLM', 'USDC')}
          />
          </li>
          <li><NavLink name="Reward" href={urlMaker.reward.root()} /></li>
        </div>
        <div className={styles.right_list}>
          {isLogged && <li><NavLink name="Wallet" href={urlMaker.wallet.root()} /></li>}
          {isLogged && <li><NavLink name="Order" href={urlMaker.order.root()} /></li>}
        </div>
      </ul>
      {isLogged ? <CustomDropdown height="40px" width="160px" />
        : (
          <Button
            variant="secondary"
            content="Connect Wallet"
            fontWeight={500}
            className={styles.btn}
            onClick={() => {
              dispatch(openConnectModal());
            }}
          />
        ) }
    </div>
  );
};

export default ObmHeader;
