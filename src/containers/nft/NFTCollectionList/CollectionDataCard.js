import NLSPMediumLogo from 'assets/images/NLSPMediumLogo';
import humanizeAmount from 'helpers/humanizeAmount';
import styles from './styles.module.scss';

function CollectionDataCard({ collection, collectionStats }) {
  return (
    <div className={styles['collection-info-main']}>
      <div className={styles['collection-info-banner']}>
        <img alt="banner" src={collection.bannerUrl} />
      </div>
      <div className={styles['collection-info-thumbnail']}>
        <img alt="thumbnail" src={collection.thumbnailUrl} />
      </div>
      <span className={styles['collection-info-title']}>{collection.name}</span>
      <div className={styles['collection-info-creator-info']}>By
        <span>
          {' '}{collection.creator}
        </span>
      </div>
      <span className={styles['collection-info-description']}>
        {collection.description}
      </span>
      <div className={styles['collection-info-stats-container']}>
        <div className={styles['collection-info-stats']}>
          <div className={styles['collection-info-stats-item']}>
            <span className={styles['collection-info-stats-item-info']}>{collectionStats.totalNfts}</span>
            <span className={styles['collection-info-stats-item-title']}>Items</span>
          </div>
          <div className={styles['collection-info-stats-item']}>
            <span className={styles['collection-info-stats-item-info']}>{collectionStats.owners}</span>
            <span className={styles['collection-info-stats-item-title']}>Owners</span>
          </div>
          <div className={styles['collection-info-stats-item']}>
            <span className={styles['collection-info-stats-item-info']}>{humanizeAmount(collectionStats.floorPrice)}<NLSPMediumLogo /></span>
            <span className={styles['collection-info-stats-item-title']}>Floor price</span>
          </div>
          <div className={styles['collection-info-stats-item']}>
            <span className={styles['collection-info-stats-item-info']}>{humanizeAmount(collectionStats.totalVolume)}<NLSPMediumLogo /></span>
            <span className={styles['collection-info-stats-item-title']}>Total volume</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CollectionDataCard;
