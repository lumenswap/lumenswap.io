import React from 'react';
import { nanoid } from 'nanoid';
import styles from './styles.module.scss';

const CTable = ({ columns, dataSource, className }) => (
  <div className={styles['table-container']}>
    <table className={className ?? styles.table}>

      <tr className={styles['header-table']}>
        {columns.map((title) => (
          <th
            style={title.style ?? { width: `${100 / columns.length}%` }}
            key={title.key}
          >
            <span>{title.title}</span>
          </th>
        ))}
      </tr>

      {dataSource.map((data) => (
        <tr className={styles.row} key={data.key ?? nanoid(4)}>
          {columns.map((column) => (
            <td
              className={styles['row-item']}
            >
              <span>
                {column.render
                  ? column.render(data[column.title], data.Url)
                  : data[column.title]}
              </span>
            </td>
          ))}
        </tr>
      ))}

    </table>
  </div>

);
export default CTable;
