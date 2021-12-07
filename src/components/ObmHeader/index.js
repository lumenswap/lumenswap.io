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
    right: [
      { name: 'Wallet', link: urlMaker.obm.wallet.root(), restricted: true },
      { name: 'My Orders', link: urlMaker.obm.order.root(), restricted: true },
    ],
    left: [
      { name: 'Market', link: urlMaker.obm.market.root() },
      { name: 'Swap', link: urlMaker.obm.swap.root() },
      {
        name: 'Spot',
        link: urlMaker.obm.spot.custom('XLM', null, 'USDC', null),
        mainHref: urlMaker.obm.spot.root(),
      },
    ],
  };

  const mobileMenu = [...menus.left, ...menus.right];

  return (
    <div className={classNames(styles.layout, 'layout')}>
      <div className="d-md-flex d-sm-none d-none w-100">
        <ul className={styles.list}>
          <div>
            <li>{logoLink}</li>
            {menus.left.map((menu, index) => (!menu.restricted || isLogged) && (
              <li key={index}>
                <NavLink name={menu.name} href={menu.link} mainHref={menu.mainHref} />
              </li>
            ))}
          </div>
          <div className={styles.right_list}>
            {menus.right.map((menu, index) => (!menu.restricted || isLogged) && (
              <li key={index}>
                <NavLink name={menu.name} href={menu.link} mainHref={menu.mainHref} />
              </li>
            ))}
          </div>
        </ul>
        {btnConnect}
      </div>
      <div className="d-md-none d-sm-block d-block w-100">
        <div className="d-flex align-items-center justify-content-end">
          <div className="mr-3">{btnConnect}</div>
          <div>{logoLink}</div>
        </div>
        <MobileMenu menus={mobileMenu} isLogged={isLogged} />
      </div>
    </div>
  );
};

export default ObmHeader;
