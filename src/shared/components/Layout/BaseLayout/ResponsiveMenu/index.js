import React, {useState} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { slide as Menu } from 'react-burger-menu';
import {Link} from 'react-router-dom';
import leftArrow from 'src/assets/images/long-arrow-left.svg';
import {orderPages} from 'src/constants/routes';
import logo from 'src/assets/images/xlm-logo.png';
import styles from './styles.module.scss';

const ResponsiveMenu = props => {
  const [isOpen, toggleOpen] = useState(false);
  const handleStateChange = (state) => {
    toggleOpen(state.isOpen)
  }

  return (
      <Menu
          pageWrapId="page-wrap"
          outerContainerId="header"
          width={314}
          right
          burgerButtonClassName={ styles.nav }
          isOpen={isOpen}
          onStateChange={state => handleStateChange(state)}
          customBurgerIcon={
            <button type="button" className="btn p-0">
              <img src={leftArrow} width="30px" height="24px" alt="icon"/>
            </button>
          }
      >
        <div className={styles.box}>
          <button
              className={classNames('icon-multiplied btn p-0', styles.close)}
              onClick={() => toggleOpen(false)}
          />
          <div className={classNames('vertical-scroll', styles.scroll)}>
            {[0,1,2,3,4,5,7,8 ].map(item => (
                <div className={styles.crypto} key={item}>
                  <div className="row align-items-center h-100">
                    <div className="col-auto">
                      <img src={logo} className={styles.logo} alt="logo"/>
                    </div>
                    <div className={classNames('col-auto pl-0', styles['item-box'])}>
                      <h5 className={styles.name}>XLM</h5>
                      <p className={styles.more}>stellarterm.com</p>
                    </div>
                    <div className="col-auto ml-auto">
                      <p className={styles.count}>10</p>
                    </div>
                  </div>
                </div>
            ))}
          </div>
        </div>
        <div className={styles.options}>
          <Link className={styles.link} to={orderPages}>Orders</Link>
          <Link className={styles.link} to="/">Logout</Link>
        </div>
      </Menu>
  );
};

ResponsiveMenu.propTypes = {

};

export default ResponsiveMenu;
