import Arrow from 'assets/images/arrowRight';
import classNames from 'classnames';
import Link from 'next/link';
import styles from './styles.module.scss';

function Breadcrumb({ data, className, spaceBetween = 6 }) {
  return (
    <h1 className={classNames(styles.main, className)}>
      {data.map((item, index) => {
        if (item.render) {
          return <>{item.render()}</>;
        }
        return (
          <div key={index} style={{ color: `${index !== data.length - 1 ? '#656872' : '#1d1d1d'}` }}>{item.url ? (
            <Link href={item.url}>
              <a>
                {item.name}
              </a>
            </Link>
          )
            : item.name} {index < data.length - 1 && <div style={{ marginRight: `${spaceBetween}px`, marginLeft: `${spaceBetween}px` }}><Arrow /></div>}
          </div>
        );
      })}
    </h1>
  );
}

export default Breadcrumb;
