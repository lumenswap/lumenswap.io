import Image from 'next/image';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import styles from './styles.module.scss';

const AuctionBoardItem = ({ board }) => {
  const router = useRouter();
  return (
    <div className={classNames(styles.box, 'mt-4')} onClick={() => router.push(board.url)}>
      <div className="row">
        <div className="col-lg-4 col-md-12 col-sm-12 col-12 pr-lg-0 pr-md-3 pr-sm-3 pr-3">
          <div className={styles.banner}>
            {board.isLive && (
            <div className={styles.status}>
              <span className={styles['status-circle']} />
              <span>Live</span>
            </div>
            )}
            <Image src={board.logo} layout="fill" objectFit="cover" objectPosition="center" />
          </div>
        </div>
        <div className="col-lg-8 col-md-12 col-sm-12 col-12 pl-lg-0 pl-md-3 pl-sm-3 pl-3">
          <div className={styles.info}>
            <h6 className={styles['info-title']}>{board.title}</h6>
            <p className={styles['info-desc']}>
              {board.description}
            </p>
            <div className={styles.badges}>
              <div className={styles.badge}>
                <span className={styles['badge-subject']}>Amount to sell</span>{board.sellAmount}
              </div>
              <div className={styles.badge}>
                <span className={styles['badge-subject']}>Base price</span>{board.basePrice}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionBoardItem;
