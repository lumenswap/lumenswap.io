import classNames from 'classnames';
import AssetBox from 'components/AssetBox';
import { useSelector } from 'react-redux';
import MobileMenu from 'components/MobileMenu';
import LogoLink from './LogoLink';
import ConnectButton from './ConnectButton';
import SideBarLink from './SideBarLink';
import styles from './styles.module.scss';

const LumenSwapHeader = ({
  showAssetBox, assetBoxProps, leftSide, rightSide, extraRightComponent, extraLeftComponent,
}) => {
  const isLogged = useSelector((state) => state.user.logged);

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
            <li><LogoLink /></li>
            {extraLeftComponent?.map((Component, index) => <Component key={index} />)}
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
        {extraRightComponent?.map((Component, index) => <Component key={index} />)}
        {(isLogged && showAssetBox) && <AssetBox {...assetBoxProps} />}
        <ConnectButton />
      </div>
      <div className="d-md-none d-sm-block d-block w-100">
        <div className="d-flex align-items-center justify-content-end">
          <div className="mr-3"><ConnectButton /></div>
          <div><LogoLink /></div>
        </div>
        <MobileMenu menus={mobileMenu} isLogged={isLogged} />
      </div>
    </div>
  );
};

export default LumenSwapHeader;
