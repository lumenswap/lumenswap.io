import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.less';

const Header = (props) => (
  <div className="row justify-content-between">
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
    <div className="col-auto">
      <div className="row justify-content-end">
        <div className="col-auto">
          <p className={classNames(styles.badge, styles.address)}>
            <span className={styles['address-title']}>Your address</span>
            <span className={styles['address-value']}>G123…8942</span>
          </p>
        </div>
        <div className="col-auto">
          <button
            type="button"
            className={classNames('btn ml-1 d-flex align-items-center h-100', styles.exit)}
          >
            <span className="icon-shutdown" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

Header.propTypes = {

};

export default Header;
