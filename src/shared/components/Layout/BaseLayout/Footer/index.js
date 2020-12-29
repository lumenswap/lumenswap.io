import React from 'react';
import classNames from 'classnames';
import gitlab from 'src/assets/images/gitlab-icon.png';
import twitter from 'src/assets/images/twitter.png';
import styles from './styles.module.scss';

const Footer = (props) => (
  <div className="row">
    <div className="col-auto">
      <a
        href="https://gitlab.com/lumenswap.io/lumenswap.io"
        className={classNames(styles.btn, styles.git)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={gitlab}
          alt="gitLab"
          width="20px"
          height="18px"
          className="center-ver-hor"
        />
      </a>
    </div>
    <a
      href="https://twitter.com/lumenswap"
      className={classNames(styles.btn, styles.git)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src={twitter}
        alt="twitter"
        width="20px"
        height="18px"
        className="center-ver-hor"
      />
    </a>
  </div>
);

Footer.propTypes = {};

export default Footer;
