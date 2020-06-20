import React from 'react';
import classNames from 'classnames';
import angleRight from '../../../assets/images/angle-right.svg';
import styles from './styles.less';

const TableInfo = ({
  title, link, className, style,
}) => (
  <div className={classNames('row justify-content-between', className)} style={style}>
    <div className="col-auto"><h4 className={styles.title}>{title}</h4></div>
    <div className="col-auto">
      <a target="_blank" rel="noreferrer" className={styles.link} href={link}>
        See all in the explorer
        <img src={angleRight} alt="angle" width="24px" height="24px" />
      </a>
    </div>
  </div>
);

export default TableInfo;
