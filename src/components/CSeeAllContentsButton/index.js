import ArrowIcon from 'assets/images/arrow-right-icon.png';
import ArrowIconDark from 'assets/images/icon-arrow-right-dark.png';
import classNames from 'classnames';
import useCurrentTheme from 'hooks/useCurrentTheme';
import Link from 'next/link';
import styles from './styles.module.scss';

function CSeeAllContentsButton({ link, content, className }) {
  const currentTheme = useCurrentTheme();
  return (
    <div className={className}>
      <Link href={link} passHref>
        <a style={{ textDecoration: 'none' }} className={classNames(styles['address-link'])}>
          {content}
          <span>
            <img
              className={styles.icon}
              src={currentTheme === 'light' ? ArrowIcon : ArrowIconDark}
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
