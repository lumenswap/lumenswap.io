import React from 'react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';

import btcLogo from 'assets/images/btc-logo.png';
import usdLogo from 'assets/images/usd-coin-usdc.png';
import AMMCurrentPrice from 'components/AMMCurrentPrice';
import Button from 'components/Button';
import { closeModalAction } from 'actions/modal';

import styles from './styles.module.scss';

const currentCurrency = {
  pair1: { value: '14', currency: 'ETH' },
  pair2: { value: '1', currency: 'BTC' },
};

const ConfirmLiquidity = () => {
  const dispatch = useDispatch();
  return (
    <div className="pb-4">
      <div className={styles.inpool}>
        <div className={styles.pair}>
          <div className={styles['pair-img']}><Image src={btcLogo} width={20} height={20} /></div>
          <div>BTC</div>
        </div>
        <div>12</div>
      </div>

      <div className={styles.inpool}>
        <div className={styles.pair}>
          <div className={styles['pair-img']}><Image src={usdLogo} width={20} height={20} /></div>
          <div>USD</div>
        </div>
        <div>5</div>
      </div>

      <div className={styles.current}><AMMCurrentPrice pairs={currentCurrency} /></div>

      <Button
        variant="primary"
        content="Confirm"
        fontWeight={500}
        className={styles.btn}
        onClick={() => dispatch(closeModalAction())}
      />
    </div>
  );
};

export default ConfirmLiquidity;
