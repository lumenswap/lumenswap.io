import classNames from 'classnames';
import Image from 'next/image';
import ArrowPagination from 'assets/images/arrow-pagination.svg';
import styles from './style.module.scss';

const index = ({ pages, currentPage, onPageClick }) => {
  const paginationArray = Array.from({ length: pages });
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
        {currentPage >= 2
        && <div className={styles['pagination-item']} onClick={() => onPageClick(1)}>1</div>}
        {currentPage > 2 && (
          <>
            <div className={styles['pagination-spread']}>...</div>
          </>
        )}
        {paginationArray.map((page, i) => (
          <div
            onClick={() => onPageClick(i + 1)}
            className={classNames(
              styles['pagination-item'],
              currentPage === i + 1 && styles.active,
            )}
          >
            {i + 1}
          </div>
        )).slice(currentPage - 1, currentPage + 2)}
        {pages - currentPage > 3 && <div className={styles['pagination-spread']}>...</div>}
        {pages - currentPage >= 3 && <div onClick={() => onPageClick(pages)} className={styles['pagination-item']}>{pages}</div>}
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

export default index;
