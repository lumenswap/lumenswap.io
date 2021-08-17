import React from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';

const DetailedInfo = ({ details }) => (
  <div className="container-fluid">
    <div className="row">
      {details.map((detail, index) => (
        <div key={index} className={classNames('col-lg-2 col-md-4 col-sm-12 col-12 px-0', styles.container)}>
          <div className={styles.block}>
            <div className={styles.title}>{detail.title}</div>
            <div className={styles.xlm}>{detail.xlm} <span>XLM</span></div>
            <div className={styles.value}>$ {detail.value}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default DetailedInfo;
