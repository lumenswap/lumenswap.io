import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import styles from './styles.module.scss';

const CTable = ({
  columns,
  dataSource,
  className,
  noDataMessage: NoDataMessage,
}) => {
  if (!dataSource || dataSource === null) {
    return <NoDataMessage />;
  }
  if (dataSource.length === 0) {
    return <NoDataMessage />;
  }

  const [sortIndex, setSortIndex] = useState(null);
  const [sortOrder, setSortOrder] = useState('desc');

  const handleSort = (sortFunc) => {
    dataSource.sort((a, b) => sortFunc(a, b, sortOrder));
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
  };

  return (
    <div className={className ?? styles['table-container']}>
      <table className={styles.table}>
        <tr className={styles['header-table']}>
          {columns.map((title) => (
            <th
              style={title.style ?? { width: `${100 / columns.length}%` }}
              key={title.key}
            >
              <span style={{ position: 'relative' }}>{title.title} {title.sortFunc && (
                <span className={styles.sort} onClick={() => handleSort(title.sortFunc)} />
              )}
              </span>

            </th>
          ))}
        </tr>

        {dataSource.map((data) => (
          <tr className={styles.row} key={data.key ?? nanoid(6)}>
            {columns.map((column) => (
              <td className={styles['row-item']}>
                <section>
                  {column.render ? column.render(data) : data[column.dataIndex]}
                </section>
              </td>
            ))}
          </tr>
        ))}
      </table>
    </div>
  );
};

export default CTable;
