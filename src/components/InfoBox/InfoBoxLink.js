import classNames from 'classnames';
import Link from 'next/link';
import styles from './styles.module.scss';

function InfoBoxLink({ item }) {
  let RowLink;
  if (item.externalLink) {
    RowLink = () => (
      <a
        className={classNames(styles['ticket-id'], styles.infos)}
        style={{ textDecoration: 'none' }}
        href={item.externalLink.url}
        target="_blank"
        rel="noreferrer"
      >{item.externalLink.title}
      </a>
    );
  }
  if (item.internalLink) {
    RowLink = () => (
      <Link href={item.internalLink.url}>
        <a className={classNames(styles['ticket-id'], styles.infos)}>
          {item.internalLink.title}
        </a>
      </Link>
    );
  }
  return <RowLink />;
}

export default InfoBoxLink;
