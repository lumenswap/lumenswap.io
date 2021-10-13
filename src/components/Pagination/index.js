import classNames from 'classnames';
import Image from 'next/image';
import ArrowPagination from 'assets/images/arrow-pagination.svg';
import { generateRange } from './helpers';
import styles from './style.module.scss';

const index = ({ pages, currentPage, onPageClick }) => {
  const paginationArray = generateRange(pages, currentPage);
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
        {paginationArray.range.map((page) => (
          <div
            onClick={!page.label ? () => onPageClick(page) : () => {}}
            className={classNames(
              styles[`pagination-${page.label ? 'spread' : 'item'}`],
              currentPage === page && styles.active,
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

export default index;
