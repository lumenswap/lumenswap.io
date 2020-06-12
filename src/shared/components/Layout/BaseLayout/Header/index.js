import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.less';

const Header = (props) => (
  <div className="row" style={{ marginTop: '39px' }}>
    <div className="col-auto">
      <div className="row">
        <div className="col-auto position-relative">
          <h6 className={classNames('center-ver', styles.logo)}>Logo</h6>
        </div>
        <div className="col-auto">
          <p className={styles.badge}>
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
          <button type="button" className="btn"><span /></button>
        </div>
      </div>
    </div>
  </div>
);

Header.propTypes = {

};

export default Header;
