import { useState } from 'react';
import { NavDropdown } from 'react-bootstrap';
import classNames from 'classnames';
import logout from 'actions/user/logout';
import { clearUserBalance } from 'actions/userBalance';
import { useDispatch, useSelector } from 'react-redux';
import minimizeAddress from 'helpers/minimizeAddress';
import rabetIcon from 'assets/images/rabet.svg';
import privateKeyIcon from 'assets/images/keyword.svg';
import albedoIcon from 'assets/images/albedo.svg';
import xbullIcon from 'assets/images/xbull.webp';
import ledgerIcon from 'assets/images/ledger.svg';
import freighterIcon from 'assets/images/freighter.svg';
import { loginTypes } from 'reducers/user';
import copyText from 'helpers/copyText';
import styles from './styles.module.scss';

const CustomDropdown = ({ className }) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userAddress = user.detail.address;
  const loginMethod = user.loginType;
  let walletIcon;
  if (loginMethod === loginTypes.PV) {
    walletIcon = privateKeyIcon;
  } else if (loginMethod === loginTypes.ALBEDO) {
    walletIcon = albedoIcon;
  } else if (loginMethod === loginTypes.FREIGHTER) {
    walletIcon = freighterIcon;
  } else if (loginMethod === loginTypes.LEDGER_S) {
    walletIcon = ledgerIcon;
  } else if (loginMethod === loginTypes.RABET) {
    walletIcon = rabetIcon;
  } else if (loginMethod === loginTypes.XBULL) {
    walletIcon = xbullIcon;
  }

  console.log(walletIcon);
  return (
    <div
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      className={classNames(styles.dropdown, className)}
    >
      <NavDropdown
        title={(
          <>
            <img
              src={walletIcon}
              style={{ marginRight: 8 }}
            /> {minimizeAddress(userAddress)}
          </>
        )}
        show={show}
        className={show && styles.hover}
        id="language-switcher-container"
      >
        <NavDropdown.Item
          eventKey={0}
          onClick={() => {
            setShow(false);
            copyText(userAddress);
          }}
        >
          <span className="icon-copy" />Copy address
        </NavDropdown.Item>
        <NavDropdown.Item eventKey={1} href={`${process.env.REACT_APP_LUMENSCAN_URL}/account/${userAddress}`} target="_blank">
          <span className="icon-earth" />
          Open in lumenscan
          <span className="icon-external" />
        </NavDropdown.Item>
        <NavDropdown.Item
          eventKey={2}
          onClick={() => {
            dispatch(clearUserBalance());
            dispatch(logout());
          }}
        >
          <span className="icon-shutdown" style={{ fontSize: '13px' }} />Disconnect
        </NavDropdown.Item>
      </NavDropdown>
    </div>
  );
};

export default CustomDropdown;
