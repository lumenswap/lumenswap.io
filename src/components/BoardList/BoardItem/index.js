import Image from 'next/image';
import { useRouter } from 'next/router';

import bannerSrc from 'assets/images/auction-banner.png';

import styles from './styles.module.scss';

const BoardItem = () => {
  const router = useRouter();
  return (
    <div className={styles.box} onClick={() => router.push('Rabet(RBT)')}>
      <div className="row">
        <div className="col-lg-4 col-md-12 col-sm-12 col-12 pr-lg-0 pr-md-3 pr-sm-3 pr-3">
          <div className={styles.banner}>
            <div className={styles.status}>
              <span className={styles['status-circle']} />
              <span>Live</span>
            </div>
            <Image src={bannerSrc} layout="fill" objectFit="cover" objectPosition="center" />
          </div>
        </div>
        <div className="col-lg-8 col-md-12 col-sm-12 col-12 pl-lg-0 pl-md-3 pl-sm-3 pl-3">
          <div className={styles.info}>
            <h6 className={styles['info-title']}>Rabet (RBT)</h6>
            <p className={styles['info-desc']}>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
            </p>
            <div className={styles.badges}>
              <div className={styles.badge}>
                <span className={styles['badge-subject']}>Amount to sell</span>10,000,000 RBT
              </div>
              <div className={styles.badge}>
                <span className={styles['badge-subject']}>Base price</span>0.3 XLM
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardItem;
