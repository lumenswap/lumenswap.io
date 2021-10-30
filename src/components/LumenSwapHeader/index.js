import Logo from 'assets/images/logo';
import Link from 'next/link';
import urlMaker from 'helpers/urlMaker';
import classNames from 'classnames';
import LSPBox from 'components/LSPBox';
import CustomDropdown from 'components/Dropdown';
import Button from 'components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { openConnectModal } from 'actions/modal';
import MobileMenu from 'components/MobileMenu';
import SideBarLink from './SideBarLink';
import styles from './styles.module.scss';

const LumenSwapHeader = ({
  showLSP, leftSide, rightSide, extraRightComponent, extraLeftComponent,
}) => {
  const isLogged = useSelector((state) => state.user.logged);
  const dispatch = useDispatch();

  const LogoLink = <Link href={urlMaker.root()}><a><Logo /></a></Link>;
  const BtnConnect = isLogged ? <CustomDropdown height="40px" width="160px" />
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
            <li>{LogoLink}</li>
            {extraLeftComponent?.map((Component) => <Component />)}
            {leftSide?.map((menu, index) => (!menu.restricted || isLogged) && (
            <SideBarLink key={index} link={menu} />
            ))}
          </div>
          <div>
            {rightSide?.map((menu, index) => (!menu.restricted || isLogged) && (
            <SideBarLink key={index} link={menu} />
            ))}
          </div>
        </ul>
        {extraRightComponent?.map((Component) => <Component />)}
        {(isLogged && showLSP) && <LSPBox />}
        {BtnConnect}
      </div>
      <div className="d-md-none d-sm-block d-block w-100">
        <div className="d-flex align-items-center justify-content-end">
          <div className="mr-3">{BtnConnect}</div>
          <div>{LogoLink}</div>
        </div>
        <MobileMenu menus={mobileMenu} isLogged={isLogged} />
      </div>
    </div>
  );
};

export default LumenSwapHeader;
