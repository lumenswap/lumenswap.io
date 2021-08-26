import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import ArrowDown from 'assets/images/arrow-down.svg';
import ArrowDownFill from 'assets/images/arrow-down-fill.svg';
import Image from 'next/image';
import Link from 'next/link';
import styles from './styles.module.scss';

const CTable = ({
  columns,
  dataSource,
  className,
  noDataMessage: NoDataMessage,
  pairSpot,
}) => {
  if (!dataSource || dataSource === null) {
    return <NoDataMessage />;
  }
  if (dataSource.length === 0) {
    return <NoDataMessage />;
  }

  const [sortIndex, setSortIndex] = useState(null);
  const [sortOrder, setSortOrder] = useState('desc');

  const handleSort = (sortFunc, newSortIndex) => {
    dataSource.sort((a, b) => sortFunc(a, b, sortOrder));
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    setSortIndex(newSortIndex);
    console.log(sortIndex);
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
                  <span className={styles.sort}>
                    <Image
                      src={sortIndex === title.dataIndex && sortOrder === 'asc' ? ArrowDownFill : ArrowDown}
                      width={8}
                      height={5}
                      className={styles.sort_icon}
                      onClick={() => handleSort(title.sortFunc, title.dataIndex)}
                    />
                    <Image
                      src={sortIndex === title.dataIndex && sortOrder === 'desc' ? ArrowDownFill : ArrowDown}
                      width={8}
                      height={5}
                      onClick={() => handleSort(title.sortFunc, title.dataIndex)}
                    />
                  </span>
                )}
              </span>
            </th>
          ))}
        </tr>

        {dataSource.map((data) => (
          pairSpot ? (
            <Link className={styles.row} key={data.key ?? nanoid(6)} href={`/spot/${data.pair.base.code}-${data.pair.counter.code}`} passHref>
              <tr className={styles.row}>
                {columns.map((column) => (
                  <td className={styles['row-item']}>
                    <section>
                      {column.render ? column.render(data) : data[column.dataIndex]}
                    </section>
                  </td>
                ))}
              </tr>
            </Link>
          ) : (
            <tr className={styles.row}>
              {columns.map((column) => (
                <td className={styles['row-item']}>
                  <section>
                    {column.render ? column.render(data) : data[column.dataIndex]}
                  </section>
                </td>
              ))}
            </tr>
          )

        ))}
      </table>
    </div>
  );
};

export default CTable;
