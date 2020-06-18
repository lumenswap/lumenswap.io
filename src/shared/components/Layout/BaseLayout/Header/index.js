import React, { useState } from 'react';
import classNames from 'classnames';
import Select from 'react-select';
import { useSelector } from 'react-redux';
import btcLogo from 'src/assets/images/btc-logo.png';
import ethLogo from 'src/assets/images/eth-logo.png';
import xlmLogo from 'src/assets/images/xlm-logo.png';
import connectModal from 'src/actions/modal/connectModal';
import minimizeAddress from 'src/helpers/minimizeAddress';
import userLogout from 'src/actions/user/logout';
import defaultTokens from 'src/tokens/defaultTokens';
import XLM from 'src/tokens/XLM';
import styles from './styles.less';

const item = (logo, code, web) => (
  <>
    <img width="16px" height="16px" className="mr-1" src={logo} alt="logo" />
    <span className={styles['option-name']}>{code}</span>
    <span className={styles['option-web']}> - {web}</span>
  </>
);

const selectItems = [
  { value: 'xlm', label: item(xlmLogo, '10 XLM', 'stellarterm.com') },
  { value: 'eth', label: item(ethLogo, '2 ETH', 'apay.com') },
  { value: 'btc', label: item(btcLogo, '2 BTC', 'apay.com') },
];

const Header = () => {
  const [selectedOption, setSelectOption] = useState(null);
  const handleChange = (selected) => {
    setSelectOption(selected);
  };

  const userData = useSelector((state) => state.user);
  const userToken = useSelector((state) => state.userToken).map((token) => {
    if (token.asset_type === 'native') {
      return {
        value: 'XLM',
        label: item(XLM.logo, `${token.balance} XLM`, 'stellarterm.com'),
      };
    }
    const found = defaultTokens.find(
      (oneToken) => oneToken.code === token.asset_code && oneToken.issuer === token.asset_issuer,
    );
    if (!found) {
      return {
        value: token.asset_code,
        label: item(XLM.logo, `${token.balance} ${token.asset_code}`, minimizeAddress(token.asset_issuer)),
      };
    }

    return {
      value: found.code,
      label: item(found.logo, `${token.balance} ${found.code}`, found.web),
    };
  });

  const select = (
    <div className="rc-select">
      <Select
        defaultValue={selectItems[0]}
        isSearchable
        className="basic-single"
        classNamePrefix="react-select"
        options={userToken}
        value={selectedOption || userToken[0]}
        onChange={handleChange}
      />
    </div>
  );

  const address = (
    <p className={classNames(styles.badge, styles.address)}>
      <span className={styles['address-title']}>Your address</span>
      <span className={styles['address-value']}>{minimizeAddress(userData.detail.publicKey)}</span>
    </p>
  );

  return (
    <>
      <div className="row justify-content-between align-items-center">
        {/* left part header */}
        <div className="col-auto">
          <div className="row">
            <div className="col-auto position-relative">
              <h6 className={classNames('center-ver', styles.logo)}>Logo</h6>
            </div>
            <div className="col-auto">
              <p className={classNames(styles.badge, styles.order)}>
                <span>Orders</span>
                <span className={styles['badge-num']}>
                  <span className="center-ver-hor">4</span>
                </span>
              </p>
            </div>
          </div>
        </div>
        {/* right part header */}
        <div className="col-auto">
          {!userData.logged && (
            <button
              type="button"
              className={classNames(styles.connect)}
              onClick={connectModal}
            >
              Connect Wallet
            </button>
          )}
          {userData.logged && (
            <div className="row justify-content-between h-100 align-items-center">
              <div className="col-auto d-lg-flex d-md-none d-sm-none d-none">
                {select}
              </div>
              <div className="col-auto d-lg-flex d-md-none d-sm-none d-none">
                {address}
              </div>
              <div className="col-auto">
                <button
                  type="button"
                  className={classNames('btn ml-1 d-flex align-items-center h-100', styles.exit)}
                  onClick={userLogout}
                >
                  <span className="icon-shutdown" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* responsive items */}
      {userData.logged && (
      <div className="row d-lg-none d-md-flex d-sm-flex d-flex mt-lg-0 mt-md-3 mt-sm-3 mt-3">
        <div className="col-auto mb-lg-0 mb-md-2 mb-sm-2 mb-2">{select}</div>
        <div className="col-auto mb-lg-0 mb-md-2 mb-sm-2 mb-2">{address}</div>
      </div>
      )}
    </>
  );
};

export default Header;
