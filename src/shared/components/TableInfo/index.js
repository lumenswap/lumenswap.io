import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import angleRight from '../../../assets/images/angle-right.svg';
import styles from './styles.less';

const TableInfo = ({
  title, link, className, style,
}) => (
  <div className={classNames('row justify-content-between', className)} style={style}>
    <div className="col-auto"><h4 className={styles.title}>{title}</h4></div>
    <div className="col-auto">
      <Link className={styles.link} to={link}>
      See all in the explorer
        <img src={angleRight} alt="angle" width="24px" height="24px" />
      </Link>
    </div>
  </div>
);

TableInfo.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default TableInfo;
