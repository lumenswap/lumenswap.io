import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.less';

const Footer = (props) => (
  <div className="row justify-content-between">
    <div className="col-auto">
      <button type="button" className={classNames(styles.btn, styles.git)}>
        <span className="icon-github" />
      </button>
    </div>
    <div className="col-auto d-flex">
      <button type="button" className={classNames(styles.btn, styles.guide)}>Guide</button>
      <button type="button" className={classNames(styles.btn, styles.theme)}>
        <span className="icon-brightness" />
      </button>
    </div>
  </div>
);

Footer.propTypes = {

};

export default Footer;
