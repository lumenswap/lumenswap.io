import rightMiniArrow from 'assets/images/right-mini-arrow.svg';
import leftMiniArrow from 'assets/images/left-mini-arrow.svg';
import blueRightMiniArrow from 'assets/images/blue-right-mini-arrow.svg';
import blueLeftMiniArrow from 'assets/images/blue-left-mini-arrow.svg';
import arrowRightDarkGray from 'assets/images/arrow-down-dark-gray.svg';
import arrowRightDark from 'assets/images/arrow-right-down-dark.svg';
import classNames from 'classnames';
import Button from 'components/Button';
import useCurrentTheme from 'hooks/useCurrentTheme';
import styles from './styles.module.scss';

const arrowIcons = {
  light: {
    enabled: blueRightMiniArrow,
    disabled: rightMiniArrow,
  },
  dark: {
    enabled: arrowRightDark,
    disabled: arrowRightDarkGray,
  },
};

function InfinitePagination({
  onNextPage, onPrevPage, className, hasNextPage, hasPreviousPage,
}) {
  const currentTheme = useCurrentTheme();
  return (
    <div className={classNames(styles.main, className)}>
      <Button
        onClick={onNextPage}
        className={hasNextPage ? styles['next-btn'] : styles['next-btn-disabled']}
      >
        <span>Next Page</span>
        <div><img
          width={10}
          height={11}
          className={styles['arrow-icon']}
          src={arrowIcons[currentTheme][hasNextPage ? 'enabled' : 'disabled']}
        />
        </div>
      </Button>
      <Button
        onClick={onPrevPage}
        className={hasPreviousPage ? styles['prev-btn'] : styles['prev-btn-disabled']}
      >
        <div><img
          width={10}
          height={11}
          className={styles['arrow-icon-left']}
          src={arrowIcons[currentTheme][hasPreviousPage ? 'enabled' : 'disabled']}
        />
        </div>
        <span>Previous Page</span>
      </Button>
    </div>
  );
}

export default InfinitePagination;
