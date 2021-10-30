import Arrow from 'assets/images/arrowRight';
import classNames from 'classnames';
import Link from 'next/link';
import styles from './styles.module.scss';

function Breadcrumb({ data, className }) {
  return (
    <h1 className={classNames(styles.main, className)}>
      {data.map((item, index) => (
        <div>{item.url ? (
          <Link href={item.url}>
            <a>
              {item.name}
            </a>
          </Link>
        )
          : item.name} {index < data.length - 1 && <Arrow />}
        </div>
      ))}
    </h1>
  );
}

export default Breadcrumb;
