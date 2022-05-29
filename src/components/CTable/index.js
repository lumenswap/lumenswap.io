import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import ArrowDown from 'assets/images/arrow-down.svg';
import ArrowDownFill from 'assets/images/arrow-down-fill.svg';
import ArrowDownFillDark from 'assets/images/arrow-fill-dark.svg';
import ArrowDownDark from 'assets/images/arrow-down-dark.svg';
import Link from 'next/link';
import Loading from 'components/Loading';
import classNames from 'classnames';
import useCurrentTheme from 'hooks/useCurrentTheme';
import styles from './styles.module.scss';

const arrowIcons = {
  light: {
    filled: ArrowDownFill,
    default: ArrowDown,
  },
  dark: {
    filled: ArrowDownFillDark,
    default: ArrowDownDark,
  },
};

const TableRow = ({ columns, data, height }) => (
  <tr style={{ height: `${height}px`, color: 'var(--blackToWhite)' }} className={styles.row}>
    {columns.map((column, index) => (
      <td key={index} className={styles['row-item']}>
        <section>
          {column.render ? column.render(data) : data[column.dataIndex]}
        </section>
      </td>
    ))}
  </tr>
);

const CTable = ({
  columns,
  dataSource,
  className,
  noDataMessage,
  noDataComponent: NoDataComponent,
  rowLink,
  loading,
  customLoading: CustomLoading,
  rowFix = { rowNumbers: 10, rowHeight: 50, headerRowHeight: 49 },
}) => {
  if (loading) {
    return (
      <>
        {CustomLoading ? <CustomLoading /> : (
          <div style={{ padding: '71px 0' }} className="d-flex align-items-center justify-content-center">
            <Loading size={48} />
          </div>
        )}
      </>
    );
  }

  if (!dataSource || dataSource === null) {
    if (NoDataComponent) {
      return <NoDataComponent />;
    }
    return (
      <div className={styles['no-data-container']}>
        <span>{noDataMessage}</span>
      </div>
    );
  }
  if (dataSource.length === 0) {
    if (NoDataComponent) {
      return <NoDataComponent />;
    }
    return (
      <div className={styles['no-data-container']}>
        <span>{noDataMessage}</span>
      </div>
    );
  }

  const [sortIndex, setSortIndex] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  const currentTheme = useCurrentTheme();

  const handleSort = (newSortIndex) => {
    setSortOrder((prev) => {
      let newSortOrder;
      if (newSortIndex === sortIndex) {
        newSortOrder = prev === 'asc' ? 'desc' : 'asc';
      } else {
        newSortOrder = 'asc';
      }
      return newSortOrder;
    });

    setSortIndex(newSortIndex);
  };
  const sortColumn = columns.find((column) => column.dataIndex === sortIndex);

  return (
    <div
      style={{
        maxHeight: `${(rowFix.rowHeight * rowFix.rowNumbers) + rowFix.headerRowHeight}px`,
      }}
      className={classNames(styles['table-container'], className)}
    >
      <table className={styles.table}>
        <tr style={{ height: `${rowFix.headerRowHeight}px` }} className={styles['header-table']}>
          {columns.map((title) => (
            <th
              style={title.style ?? { width: `${100 / columns.length}%`, minWidth: '150px' }}
              key={title.key}
            >
              <span style={{ position: 'relative' }}>
                {title.title}{' '}
                {title.sortFunc && (
                  <span
                    className={styles.sort}
                    onClick={() => handleSort(title.dataIndex)}
                  >
                    <img
                      src={sortIndex === title.dataIndex && sortOrder === 'asc' ? arrowIcons[currentTheme].filled : arrowIcons[currentTheme].default}
                      width={8}
                      height={5}
                      className={styles.sort_icon}
                    />
                    <img
                      src={sortIndex === title.dataIndex && sortOrder === 'desc' ? arrowIcons[currentTheme].filled : arrowIcons[currentTheme].default}
                      width={8}
                      height={5}
                    />
                  </span>
                )}
              </span>
            </th>
          ))}
        </tr>

        {dataSource.sort((a, b) => {
          if (sortIndex === null) return 0;
          return sortColumn.sortFunc(a, b, sortOrder);
        }).map((data) => (
          rowLink ? (
            <Link key={data.key ?? nanoid(6)} href={rowLink(data)}>
              <a className={styles.rowLink}>
                <TableRow columns={columns} data={data} height={rowFix.rowHeight} />
              </a>
            </Link>
          ) : (
            <TableRow
              rowKey={data.key ?? nanoid(6)}
              key={data.key ?? nanoid(6)}
              columns={columns}
              data={data}
              height={rowFix.rowHeight}
            />
          )
        ))}
      </table>
    </div>
  );
};

export default CTable;
