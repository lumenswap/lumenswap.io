import Link from 'next/link';
import styles from './styles.module.scss';

function CollectionCard({ collection }) {
  return (
    <Link href="/">
      <a className={styles.link}>
        <div className={styles.main}>
          <div className={styles['banner-container']}>
            <img alt="banner" src={collection.bannerUrl} />
          </div>
          <div className={styles['thumbnail-container']}>
            <img alt="thumbnail" src={collection.thumbnailUrl} />
          </div>
          <span className={styles.title}>
            {collection.name}
          </span>
          <div className={styles['collection-creator-info']}>
            By <span>{collection.creator}</span>
          </div>
        </div>
      </a>
    </Link>
  );
}

export default CollectionCard;
