import React, { useState } from 'react';
import classNames from 'classnames';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';
import leftArrow from 'src/assets/images/long-arrow-left.svg';
import { orderPages } from 'src/constants/routes';
import styles from './styles.module.scss';
import questionLogo from 'src/assets/images/question.png';
import { useSelector } from 'react-redux';
import defaultTokens from 'src/tokens/defaultTokens';
import XLM from 'src/tokens/XLM';
import logout from 'src/actions/user/logout';

const ResponsiveMenu = (props) => {
  const [isOpen, toggleOpen] = useState(false);
  const handleStateChange = (state) => {
    toggleOpen(state.isOpen);
  };

  const userToken = useSelector((state) => state.userToken)
    .sort((a, b) => {
      if (a.asset_type === 'native') {
        return -1;
      }
      if (b.asset_type === 'native') {
        return 1;
      }

      return 0;
    })
    .map((token) => {
      if (token.asset_type === 'native') {
        return {
          value: 'XLM',
          logo: XLM.logo,
          balance: token.balance,
        };
      }
      const found = defaultTokens.find(
        (oneToken) =>
          oneToken.code === token.asset_code &&
          oneToken.issuer === token.asset_issuer
      );
      if (!found) {
        return {
          value: token.asset_code,
          logo: questionLogo,
          balance: token.balance,
        };
      }

      return {
        value: found.code,
        logo: found.logo,
        balance: token.balance,
      };
    });

  return (
    <Menu
      pageWrapId="page-wrap"
      outerContainerId="header"
      width={314}
      right
      burgerButtonClassName={styles.nav}
      isOpen={isOpen}
      onStateChange={(state) => handleStateChange(state)}
      customBurgerIcon={
        <button type="button" className="btn p-0">
          <img src={leftArrow} width="30px" height="24px" alt="icon" />
        </button>
      }
    >
      <div className={styles.box}>
        <button
          className={classNames('icon-multiplied btn p-0', styles.close)}
          onClick={() => toggleOpen(false)}
        />
        <div className={classNames('vertical-scroll', styles.scroll)}>
          {userToken.map((item) => (
            <div className={styles.crypto} key={item.value}>
              <div className="row align-items-center h-100">
                <div className="col-auto">
                  <img src={item.logo} className={styles.logo} alt="logo" />
                </div>
                <div
                  className={classNames('col-auto pl-0', styles['item-box'])}
                >
                  <h5 className={styles.name}>{item.value}</h5>
                  <p className={styles.more}>{item.balance}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.options}>
        <Link className={styles.link} to={orderPages}>
          Orders
        </Link>
        <Link
          className={styles.link}
          onClick={() => {
            logout();
          }}
        >
          Logout
        </Link>
      </div>
    </Menu>
  );
};

ResponsiveMenu.propTypes = {};

export default ResponsiveMenu;
