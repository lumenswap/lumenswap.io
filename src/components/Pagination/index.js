import classNames from 'classnames';
import styles from './styles.module.scss';

const index = ({ pages, currentPage, onPageClick }) => (
  <div className={styles['pagination-container']}>
    <div>Prev</div>
    <div>
      {Array.from({ length: pages }).map((page, i) => (
        <div
          onClick={() => onPageClick(i)}
          className={classNames(
            styles['pagination-item'],
            currentPage === i && styles.active,
          )}
        >
          {i}
        </div>
      ))}
    </div>
    <div>Next</div>
  </div>
);

export default index;
