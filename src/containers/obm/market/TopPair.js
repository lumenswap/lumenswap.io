import smallArrowUp from 'assets/images/small-arrow-up.svg';
import classNames from 'classnames';
import CurrencyPair from 'components/CurrencyPair';
import urlMaker from 'helpers/urlMaker';
import Link from 'next/link';
import styles from './styles.module.scss';

function TopPair({
  number, info, images, percentage,
}) {
  const tokens = info.split('/');

  return (
    <div className="col-lg-4 col-md-8 col-12 p-lg-0">
      <Link href={urlMaker.obm.spot.custom(tokens[0], null, tokens[1], null)}>
        <a className={classNames(styles['top-pair-item'], styles.link)}>
          <div className={styles['top-pair-item-info']}>
            <span>{number}</span>
            <span className={styles['top-pair-item-info-images']}>
              <CurrencyPair size={20} source={images} />
            </span>
            <span>{info}</span>
          </div>
          <div className={styles['top-pair-item-amount']}>
            <div className={styles['top-pair-item-icon-container']}>
              <div>
                <img src={smallArrowUp} width={8} height={5} />
              </div>
            </div>
            <div>
              <span className={styles['top-pair-item-amount-text']}>{percentage}%</span>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
}

export default TopPair;
