import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import gitlab from 'src/assets/images/gitlab-icon.png';
import styles from './styles.module.scss';

const Footer = (props) => (
  <div className="row justify-content-between">
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
    {/* <div className="col-auto d-flex"> */}
    {/*  <button type="button" className={classNames(styles.btn, styles.guide)}>Guide</button> */}
    {/*  <button type="button" className={classNames(styles.btn, styles.theme)}> */}
    {/*    <span className="icon-brightness" /> */}
    {/*  </button> */}
    {/* </div> */}
  </div>
);

Footer.propTypes = {};

export default Footer;
