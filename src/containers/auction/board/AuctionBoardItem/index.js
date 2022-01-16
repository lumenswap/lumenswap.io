import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';
import humanAmount from 'helpers/humanAmount';
import urlMaker from 'helpers/urlMaker';
import { statusClassNames } from 'containers/auction/consts/board';
import styles from './styles.module.scss';

const STATUS_CLASSNAMES = statusClassNames(styles);

const AuctionBoardItem = ({ board }) => (
  <Link href={urlMaker.auction.singleAuction.root(`${board.title}(${board.assetCode})`)} passHref>
    <a className="text-decoration-none">
      <div className={classNames(styles.box, 'mt-4')}>
        <div className="row">
          <div className="col-lg-4 col-md-12 col-sm-12 col-12 pr-lg-0 pr-md-3 pr-sm-3 pr-3">
            <div className={styles.banner}>
              <div
                className={
                  classNames(styles.status, STATUS_CLASSNAMES[board.status.toLowerCase()])
                }
              >
                <span className={styles['status-circle']} />
                <span>{board.status}</span>
              </div>
              {board.image && (
                <div className={styles['title-container']}>
                  <div className={styles['img-container']}>
                    <Image src={board.image} width={82} height={82} />
                    <span className={styles['img-container-title']}>
                      {board.assetCode}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="col-lg-8 col-md-12 col-sm-12 col-12 pl-lg-0 pl-md-3 pl-sm-3 pl-3">
            <div className={styles.info}>
              <h6 className={styles['info-title']}>{board.title}({board.assetCode})</h6>
              <p className={styles['info-desc']}>
                {board.description}
              </p>
              <div className={styles.badges}>
                <div className={styles.badge}>
                  <span className={styles['badge-subject']}>Amount to sell</span>{humanAmount(board.amountToSell)} {board.assetCode}
                </div>
                <div className={styles.badge}>
                  <span className={styles['badge-subject']}>Base price</span>{`${board.basePrice} XLM`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </a>
  </Link>
);

export default AuctionBoardItem;
