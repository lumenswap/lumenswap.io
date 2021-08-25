import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import ArrowDown from 'assets/images/arrow-down.svg';
import ArrowDownFill from 'assets/images/arrow-down-fill.svg';
import Image from 'next/image';
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
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSort = (sortFunc, newSortIndex) => {
    setSortOrder((prev) => {
      let newSortOrder;
      if (newSortIndex === sortIndex) {
        newSortOrder = prev === 'asc' ? 'desc' : 'asc';
      } else {
        newSortOrder = 'asc';
      }

      dataSource.sort((a, b) => sortFunc(a, b, newSortOrder));
      return newSortOrder;
    });
    setSortIndex(newSortIndex);
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
              <span style={{ position: 'relative' }}>
                {title.title}{' '}
                {title.sortFunc && (
                  <span
                    className={styles.sort}
                    onClick={() => handleSort(title.sortFunc, title.dataIndex)}
                  >
                    <Image
                      src={sortIndex === title.dataIndex && sortOrder === 'asc' ? ArrowDownFill : ArrowDown}
                      width={8}
                      height={5}
                      className={styles.sort_icon}

                    />
                    <Image
                      src={sortIndex === title.dataIndex && sortOrder === 'desc' ? ArrowDownFill : ArrowDown}
                      width={8}
                      height={5}
                    />
                  </span>
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
