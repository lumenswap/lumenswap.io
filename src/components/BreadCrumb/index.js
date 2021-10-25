import Arrow from 'assets/images/arrowRight';
import classNames from 'classnames';
import Link from 'next/link';
import styles from './styles.module.scss';

function BreadCrump({ data, className }) {
  return (
    <h1 className={classNames(styles.main, className)}>
      {data.map((item, index) => (
        <div>{item.link ? (
          <Link href={item.link}>
            <a>
              {item.title}
            </a>
          </Link>
        )
          : item.title} {index < data.length - 1 && <Arrow />}
        </div>
      ))}
    </h1>
  );
}

export default BreadCrump;
