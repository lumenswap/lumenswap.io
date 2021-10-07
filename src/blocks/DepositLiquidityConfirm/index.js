import React from 'react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';

import AMMCurrentPrice from 'components/AMMCurrentPrice';
import Button from 'components/Button';
import { closeModalAction } from 'actions/modal';

import styles from './styles.module.scss';

const currentCurrency = {
  pair1: { value: '14', currency: 'ETH' },
  pair2: { value: '1', currency: 'BTC' },
};

const DepositLiquidityConfirm = ({ data }) => {
  const dispatch = useDispatch();
  return (
    <div className="pb-4">
      <div className={styles.inpool}>
        <div className={styles.pair}>
          <div className={styles['pair-img']}><Image src={data.tokenA.logo} width={20} height={20} /></div>
          <div>{data.tokenA.code}</div>
        </div>
        <div>{data.tokenA.balance}</div>
      </div>

      <div className={styles.inpool}>
        <div className={styles.pair}>
          <div className={styles['pair-img']}><Image src={data.tokenB.logo} width={20} height={20} /></div>
          <div>{data.tokenB.code}</div>
        </div>
        <div>{data.tokenB.balance}</div>
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

export default DepositLiquidityConfirm;
