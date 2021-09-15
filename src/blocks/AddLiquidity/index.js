import React, { useState } from 'react';
import Image from 'next/image';

import btcLogo from 'assets/images/btc-logo.png';
import usdLogo from 'assets/images/usd-coin-usdc.png';
import Button from 'components/Button';
import LiquidityInput from 'components/LiquidityInput';

import styles from './styles.module.scss';

const setLabel = (name, src) => (
  <div className="d-flex align-items-center">
    <Image src={src} width={20} height={20} alt={name} />
    <span className="ml-2">{name}</span>
  </div>
);

const AddLiquidity = (props) => {
  const [show, setShow] = useState(false);
  return (
    <div className="pb-4">
      <h6 className={styles.label}>Select pair</h6>
      <div className="d-flex justify-content-between">
        <div className={styles.select}>
          {setLabel('BTC', btcLogo)}
          <sapn className="icon-angle-down" />
        </div>
        <div className={styles.select}>
          {setLabel('USD', usdLogo)}
          <sapn className="icon-angle-down" />
        </div>
      </div>

      <div className={styles.box}>
        <div className={styles['box-title']} onClick={() => setShow(true)}>Current Price</div>
        <div className={styles['box-value']} onClick={() => setShow(true)}>14 ETH per BTC</div>
      </div>

      <hr className={styles.hr} />

      <h6 className={styles.label}>Add liquidity</h6>
      <LiquidityInput
        balance="12 LSP"
        value={15}
        currency="USD"
        currencySrc={usdLogo}
      />
      <LiquidityInput
        balance="12 LSP"
        value={6}
        currency="BTC"
        currencySrc={btcLogo}
        className="mt-3"
      />
      <Button
        variant="primary"
        content="Add Liquidity"
        fontWeight={500}
        className={styles.btn}
      />
    </div>
  );
};

export default AddLiquidity;
