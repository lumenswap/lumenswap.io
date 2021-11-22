import rightMiniArrow from 'assets/images/right-mini-arrow.svg';
import leftMiniArrow from 'assets/images/left-mini-arrow.svg';
import blueRightMiniArrow from 'assets/images/blue-right-mini-arrow.svg';
import blueLeftMiniArrow from 'assets/images/blue-left-mini-arrow.svg';
import classNames from 'classnames';
import Image from 'next/image';
import Button from 'components/Button';
import styles from './styles.module.scss';

function InfinitePagination({
  allPages, currentPage = 1, onPageChange, className,
}) {
  const nextPageCondition = currentPage !== allPages;
  const prevPageCondition = currentPage !== 1;
  const handleNextPage = () => {
    if (nextPageCondition) {
      onPageChange(currentPage + 1);
    }
  };
  const handlePrevPage = () => {
    if (prevPageCondition) {
      onPageChange(currentPage - 1);
    }
  };
  return (
    <div className={classNames(styles.main, className)}>
      <Button
        onClick={handleNextPage}
        className={nextPageCondition ? styles['next-btn'] : styles['next-btn-disabled']}
      >
        <span>Next Page</span>
        <div><Image
          width={10}
          height={11}
          src={nextPageCondition ? blueRightMiniArrow : rightMiniArrow}
        />
        </div>
      </Button>
      <Button
        onClick={handlePrevPage}
        className={prevPageCondition ? styles['prev-btn'] : styles['prev-btn-disabled']}
      >
        <div><Image
          width={10}
          height={11}
          src={prevPageCondition ? blueLeftMiniArrow : leftMiniArrow}
        />
        </div>
        <span>Previous Page</span>
      </Button>
    </div>
  );
}

export default InfinitePagination;
