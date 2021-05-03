import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.module.scss';

const Table = ({ tableHead, tableRows }) => (
  <div className={classNames(styles['table-scroll'])}>
    <table className={classNames('table', styles.table)}>
      <thead>
        <tr>
          {tableHead.map((head, index) => (
            <th key={index} scope="col">
              {head && head.toUpperCase()}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{tableRows}</tbody>
    </table>
  </div>
);

Table.propTypes = {
  tableHead: PropTypes.array.isRequired,
  tableRows: PropTypes.array.isRequired,
};

export default Table;
