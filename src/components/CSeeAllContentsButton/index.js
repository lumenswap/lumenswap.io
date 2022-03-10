import ArrowIcon from 'assets/images/arrow-right-icon.png';
import classNames from 'classnames';
import Link from 'next/link';
import styles from './styles.module.scss';

function CSeeAllContentsButton({ link, content, className }) {
  return (
    <div className={className}>
      <Link href={link} passHref>
        <a style={{ textDecoration: 'none' }} className={classNames(styles['address-link'])}>
          {content}
          <span>
            <img
              className={styles.icon}
              src={ArrowIcon}
              width={16}
              height={16}
            />
          </span>
        </a>
      </Link>
    </div>
  );
}

export default CSeeAllContentsButton;
