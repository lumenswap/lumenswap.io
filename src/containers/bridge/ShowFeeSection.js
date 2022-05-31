import getAssetFee from 'api/birdgeAPI/getAssetFee';
import BN from 'helpers/BN';
import humanizeAmount from 'helpers/humanizeAmount';
import { useEffect, useRef, useState } from 'react';
import { calculateToAmountFee } from './calculateFromAndToAmounts';
import styles from './styles.module.scss';
import { TOKEN_A_FORM_NAME, TOKEN_B_FORM_NAME } from './tokenFormNames';

function ShowFeeSection({ convertInfo }) {
  const [assetFee, setAssetFee] = useState(null);
  const fetchFeeTimeOutRef = useRef(null);

  function fetchFeeFromServer(refreshData) {
    if (refreshData) {
      setAssetFee(null);
    }
    getAssetFee(convertInfo[TOKEN_B_FORM_NAME]).then((feeData) => {
      setAssetFee(feeData.fee);
    }).catch((err) => console.error(err));
  }
  useEffect(() => {
    fetchFeeFromServer(true);
    fetchFeeTimeOutRef.current = setInterval(() => fetchFeeFromServer(), 10000);

    return () => {
      if (fetchFeeTimeOutRef.current) {
        clearInterval(fetchFeeTimeOutRef.current);
      }
    };
  }, [convertInfo[TOKEN_A_FORM_NAME]]);
  const toAssetPrecision = convertInfo[TOKEN_B_FORM_NAME].precision;
  const toAssetTotalFee = calculateToAmountFee(assetFee, toAssetPrecision);
  return (
    <div className={styles['show-info']}>
      <div className={styles['show-info-item']}>
        <p className={styles['show-info-item-text']}>You’ll convert</p>
        <div className={styles['show-info-item-number']}>{humanizeAmount(convertInfo.amount)} {convertInfo[TOKEN_A_FORM_NAME].name}</div>
      </div>
      <div className={styles['show-info-item']}>
        <p className={styles['show-info-item-text']}>Fee</p>
        <div className={styles['show-info-item-number']}>
          {assetFee ? `-${humanizeAmount(toAssetTotalFee)} ${convertInfo[TOKEN_B_FORM_NAME].name}` : '-'}
        </div>
      </div>
      <div className={styles['show-info-item']}>
        <p className={styles['show-info-item-text']}>You’ll receive</p>
        <div className={styles['show-info-item-number']}>
          {assetFee ? `${humanizeAmount(new BN(convertInfo.amount).minus(toAssetTotalFee).toString())} ${convertInfo[TOKEN_B_FORM_NAME].name}` : '-'}
        </div>
      </div>
    </div>
  );
}

export default ShowFeeSection;
