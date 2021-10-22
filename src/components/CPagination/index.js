import classNames from 'classnames';
import Image from 'next/image';
import ArrowPagination from 'assets/images/arrow-pagination.svg';
import { useEffect, useState } from 'react';
import { generateRange } from './helpers';
import styles from './style.module.scss';

const CPagination = ({ pages, currentPage: initCurrentPage, onPageClick }) => {
  const [currentPage, setCurrentPage] = useState(initCurrentPage);

  useEffect(() => {
    setCurrentPage(initCurrentPage);
  }, [initCurrentPage]);

  function onPaginationClick(page) {
    if (!page.label) {
      if (initCurrentPage !== page) {
        onPageClick(page);
      }
    } else if (page.fnc === 'goback') {
      if (currentPage - 3 < 1) {
        setCurrentPage(1);
      } else {
        setCurrentPage((prev) => prev - 3);
      }
    } else if (page.fnc === 'gonext') {
      if (currentPage + 3 > pages) {
        setCurrentPage(pages);
      } else {
        setCurrentPage((prev) => prev + 3);
      }
    }
  }

  const paginationArray = generateRange(pages, 1, currentPage);
  return (
    <div className={styles['pagination-container']}>
      <button disabled={currentPage <= 1} type="button" onClick={() => onPageClick(currentPage - 1)}>
        <Image
          className={classNames(styles.arrowLeft, currentPage <= 1 && styles.disabled)}
          src={ArrowPagination}
          width={20}
          height={10}
          objectFit="contain"
        />
      </button>
      <div className={styles['pagination-items']}>
        {paginationArray.map((page, i) => (
          <div
            onClick={() => onPaginationClick(page)}
            key={i}
            className={classNames(
              styles[`pagination-${page.label ? 'spread' : 'item'}`],
              initCurrentPage === page && styles.active,
            )}
          >
            {page.label || page}
          </div>
        ))}
      </div>
      <button type="button" disabled={currentPage >= pages} onClick={() => onPageClick(currentPage + 1)}>
        <Image
          className={classNames(styles.arrowRight, currentPage >= pages && styles.disabled)}
          src={ArrowPagination}
          width={20}
          height={10}
          objectFit="contain"
        />
      </button>
    </div>
  );
};

export default CPagination;
