import React, {useState} from 'react';
import classNames from 'classnames';
import Select from 'react-select';
import {useSelector} from 'react-redux';
import connectModal from 'src/actions/modal/connectModal';
import minimizeAddress from 'src/helpers/minimizeAddress';
import userLogout from 'src/actions/user/logout';
import defaultTokens from 'src/tokens/defaultTokens';
import XLM from 'src/tokens/XLM';
import questionLogo from 'src/assets/images/question.png';
import logo from 'src/assets/images/logo.svg';
import history from 'src/history';
import {orderPages} from 'src/constants/routes';
import {Link} from 'react-router-dom';
import reportLoginClick from 'src/api/metrics/reportLoginClick';
import CopyInfo from 'src/shared/components/CopyInfo';
import styles from './styles.module.scss';
import ResponsiveMenu from '../ResponsiveMenu';

const item = (innerLogo, code, web) => (
    <>
      <img width="16px" height="16px" className="mr-1" src={innerLogo}
           alt="logo"/>
      <span className={styles['option-name']}>{code}</span>
      <span className={styles['option-web']}> - {web}</span>
    </>
);

const Header = () => {
  const [selectedOption, setSelectOption] = useState(null);
  const handleChange = (selected) => {
    setSelectOption(selected);
  };

  const userData = useSelector((state) => state.user);
  const userToken = useSelector((state) => state.userToken).sort((a, b) => {
    if (a.asset_type === 'native') {
      return -1;
    }
    if (b.asset_type === 'native') {
      return 1;
    }

    return 0;
  }).map((token) => {
    if (token.asset_type === 'native') {
      return {
        value: 'XLM',
        label: item(XLM.logo, `${token.balance} XLM`, 'stellar.org'),
      };
    }
    const found = defaultTokens.find(
        (oneToken) => oneToken.code === token.asset_code && oneToken.issuer ===
            token.asset_issuer,
    );
    if (!found) {
      return {
        value: token.asset_code,
        label: item(questionLogo, `${token.balance} ${token.asset_code}`,
            minimizeAddress(token.asset_issuer, 6)),
      };
    }

    return {
      value: found.code,
      label: item(found.logo, `${token.balance} ${found.code}`, found.web),
    };
  });

  const logoLink = (
      <Link to="/">
        <div className="col-auto position-relative" style={{cursor: 'pointer'}}>
          <img src={logo} alt="logo" width="146px" height="34px"/>
        </div>
      </Link>
  );

  const desktopClass = 'd-xl-flex d-lg-flex d-md-none d-sm-none d-none';

  return (
      <>
        {userData.logged ? (
            <div className="row justify-content-between align-items-center">
              {/* left part header */}
              <div className="col-auto">
                <div className="row">
                  {logoLink}
                  <div className={`col-auto ${desktopClass}`}
                       onClick={() => history.push(orderPages)}
                       style={{cursor: 'pointer'}}>
                    <p className={classNames(styles.badge, styles.order)}>
                      <span>Orders</span>
                      {/*<span className={styles['badge-num']}>
                      <span className="center-ver-hor">4</span>
                      </span>*/}
                    </p>
                  </div>
                </div>
              </div>
              {/* right part header */}
              <div className={`col-auto ${desktopClass}`}>
                <div className="row justify-content-between h-100 align-items-center">
                  <div className="col-auto">
                    <div className="rc-select">
                      <Select
                          defaultValue={selectedOption || userToken[0]}
                          isSearchable
                          className="basic-single"
                          classNamePrefix="react-select"
                          options={userToken}
                          value={selectedOption || userToken[0]}
                          onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-auto">
                    <p className={classNames(styles.badge, styles.address)}>
                      {/* <span className={styles['address-title']}>Your address</span> */}
                      <CopyInfo id="address" text={userData.detail && userData.detail.publicKey}>
                        <span className={styles['address-value']}>
                          {minimizeAddress(userData.detail.publicKey, 6)}
                        </span>
                      </CopyInfo>
                    </p>
                  </div>
                  <div className="col-auto">
                    <button
                        type="button"
                        className={classNames('btn ml-1 d-flex align-items-center h-100', styles.exit)}
                        onClick={userLogout}
                    >
                      <span className="icon-shutdown"/>
                    </button>
                  </div>
                </div>
              </div>
            </div>
        ) : (
            <div className="row justify-content-between align-items-center">
              {/* left part header */}
              <div className="col-auto">
                <div className="row">{logoLink}</div>
              </div>
              {/* right part header */}
              <div className="col-auto">
                <button
                    type="button"
                    className={classNames(styles.connect)}
                    onClick={() => {reportLoginClick();connectModal();}}>
                  Connect Wallet
                </button>
              </div>
            </div>
        )}
      </>
  );
};

export default Header;
