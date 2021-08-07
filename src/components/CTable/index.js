import React from 'react';
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
        <tr className={styles.row} key={data.key}>
          {columns.map((column) => (
            <td
              className={styles['row-item']}
            >
              {column.title === 'Tx' ? (
                <a
                  className={styles.links}
                  target="_blank"
                  href={data.Url}
                  rel="noreferrer"
                >
                  {column.render ? column.render(data) : data[column.title]}
                </a>
              ) : (
                <span>
                  {column.render ? column.render(data) : data[column.title]}
                </span>
              )}

            </td>
          ))}
        </tr>
      ))}

    </table>
  </div>

);
export default CTable;
