import Logo from 'assets/images/logo';
import Link from 'next/link';
import urlMaker from 'helpers/urlMaker';
import classNames from 'classnames';

import CustomDropdown from 'components/Dropdown';
import Button from 'components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { openConnectModal } from 'actions/modal';
import NavLink from 'components/NavLink';
import MobileMenu from 'components/MobileMenu';
import styles from './styles.module.scss';

const ObmHeader = () => {
  const isLogged = useSelector((state) => state.user.logged);
  const dispatch = useDispatch();

  const logoLink = <Link href={urlMaker.root()}><a><Logo /></a></Link>;
  const btnConnect = isLogged ? <CustomDropdown height="40px" width="160px" />
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
    );

  const menus = {
    right: [{
      name: 'Wallet', href: urlMaker.wallet.root(), public: false, position: 'right',
    },
    {
      name: 'Order', href: urlMaker.order.root(), public: false, position: 'right',
    }],
    left: [{
      name: 'Market', href: urlMaker.market.root(), public: true, position: 'left',
    },
    {
      name: 'Swap', href: urlMaker.swap.root(), public: true, position: 'left',
    },
    {
      name: 'Spot', href: urlMaker.spot.custom('XLM', null, 'USDC', null), mainHref: urlMaker.spot.root(), public: true, position: 'left',
    },
    {
      name: 'Reward', href: urlMaker.reward.root(), public: false, position: 'left',
    }],
  };

  return (
    <div>
      <div className={classNames(styles.layout, 'layout')}>
        <div className="d-md-flex d-sm-none d-none w-100">
          <ul className={styles.list}>
            <div>
              <li>{logoLink}</li>
              {menus.left.map((menu, index) => (
                <div key={index}>
                  <li className={menu.public || isLogged ? 'd-block' : 'd-none'}>
                    <NavLink name={menu.name} href={menu.href} mainHref={menu.mainHref} />
                  </li>
                </div>
              ))}
            </div>
            <div className={styles.right_list}>
              {menus.right.map((menu, index) => (
                <div key={index}>
                  <li className={menu.public || isLogged ? 'd-block' : 'd-none'}>
                    <NavLink name={menu.name} href={menu.href} mainHref={menu.mainHref} />
                  </li>
                </div>
              ))}
            </div>
          </ul>
          <div>{btnConnect}</div>
        </div>
      </div>
      <div className="d-md-none d-sm-block d-block">
        <div className="d-flex align-items-center justify-content-end">
          <div className="mr-3">{btnConnect}</div>
          <div>{logoLink}</div>
        </div>
        <MobileMenu />
      </div>
    </div>
  );
};

export default ObmHeader;
