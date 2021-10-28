import Logo from 'assets/images/logo';
import Link from 'next/link';
import urlMaker from 'helpers/urlMaker';
import classNames from 'classnames';
import LSPBox from 'components/LSPBox';
import CustomDropdown from 'components/Dropdown';
import Button from 'components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { openConnectModal } from 'actions/modal';
import NavLink from 'components/NavLink';
import MobileMenu from 'components/MobileMenu';
import Image from 'next/image';
import arrowHeaderIcon from '../../assets/images/arrow-header.svg';
import styles from './styles.module.scss';

const LumenSwapHeader = ({
  showLSP, leftSide, rightSide, extraRightComponent, extraLeftComponent,
}) => {
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

  let mobileMenu = [];
  if (leftSide) {
    mobileMenu = [...leftSide];
  }
  if (rightSide) {
    mobileMenu = [...mobileMenu, ...rightSide];
  }
  return (
    <div className={classNames(styles.layout, 'layout')}>
      <div className="d-md-flex d-sm-none d-none w-100">
        <ul className={styles.list}>
          <div>
            <li>{logoLink}</li>
            {extraLeftComponent?.map((Component) => <Component />)}
            {leftSide?.map((menu, index) => (!menu.restricted || isLogged) && (
            <li key={index}>
              {!menu.external ? (

                <NavLink
                  name={menu.name}
                  href={menu.link}
                  mainHref={menu.mainHref}
                  disableMainHref={menu.disableMainHref}
                />

              )
                : (
                  <a
                    className={styles['out-link']}
                    target="_blank"
                    href={menu.link}
                    rel="noreferrer"
                  >
                    {menu.name}
                    <div><Image src={arrowHeaderIcon} width={12} height={12} /></div>
                  </a>
                ) }
            </li>
            ))}
          </div>
          <div>
            {rightSide?.map((menu, index) => (!menu.restricted || isLogged) && (
            <li key={index}>
              {!menu.external ? (
                <NavLink
                  name={menu.name}
                  href={menu.link}
                  mainHref={menu.mainHref}
                  disableMainHref={menu.disableMainHref}
                />
              )
                : (
                  <a
                    className={styles['out-link']}
                    target="_blank"
                    href={menu.link}
                    rel="noreferrer"
                  >
                    {menu.name}
                    <div><Image src={arrowHeaderIcon} width={12} height={12} /></div>
                  </a>
                ) }
            </li>
            ))}
          </div>
        </ul>
        {extraRightComponent?.map((Component) => <Component />)}
        {(isLogged && showLSP) && <LSPBox />}
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

export default LumenSwapHeader;
