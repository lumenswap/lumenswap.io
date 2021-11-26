import smallArrowUp from 'assets/images/small-arrow-up.svg';
import CurrencyPair from 'components/CurrencyPair';
import Image from 'next/image';
import styles from './styles.module.scss';

function TopPair({
  number, info, images, percentage,
}) {
  return (
    <div className="col-lg-4 col-md-8 col-12 p-lg-0">
      <div className={styles['top-pair-item']}>
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
              <Image src={smallArrowUp} width={8} height={5} />
            </div>
          </div>
          <div>
            <span className={styles['top-pair-item-amount-text']}>{percentage}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopPair;
