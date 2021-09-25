import React, { useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import btcLogo from 'assets/images/btc-logo.png';
import usdLogo from 'assets/images/usd-coin-usdc.png';
import Button from 'components/Button';
import LiquidityInput from 'components/LiquidityInput';
import AMMCurrentPrice from 'components/AMMCurrentPrice';
import { closeModalAction, openModalAction } from 'actions/modal';
import ConfirmLiquidity from 'blocks/ConfirmLiquidity';

import styles from './styles.module.scss';

const setLabel = (name, src) => (
  <div className="d-flex align-items-center">
    <Image src={src} width={20} height={20} alt={name} />
    <span className="ml-2">{name}</span>
  </div>
);

const AddLiquidity = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm({
    mode: 'onChange',
  });

  const onSubmit = (data) => {
    // console.warn(data);
    dispatch(closeModalAction());
    dispatch(
      openModalAction({
        modalProps: {
          title: 'Add Liquidity',
          className: 'main',
        },
        content: <ConfirmLiquidity />,
      }),
    );
  };

  const currentCurrency = {
    pair1: { value: '14', currency: 'ETH' },
    pair2: { value: '1', currency: 'BTC' },
  };

  return (
    <div className="pb-4">
      <h6 className={styles.label}>Select pair</h6>
      <div className="d-flex justify-content-between">
        <div className={styles.select} onClick={() => setShow(true)}>
          {setLabel('BTC', btcLogo)}
          <span className="icon-angle-down" />
        </div>
        <div className={styles.select} onClick={() => setShow(true)}>
          {setLabel('USD', usdLogo)}
          <span className="icon-angle-down" />
        </div>
      </div>

      <div className={styles.current}><AMMCurrentPrice pairs={currentCurrency} /></div>

      <hr className={styles.hr} />

      <h6 className={styles.label}>Add liquidity</h6>
      <form onSubmit={handleSubmit(onSubmit)}>
        <LiquidityInput
          balance="12 LSP"
          value={15}
          currency="USD"
          currencySrc={usdLogo}
          innerRef={register}
          name="one"
        />
        <LiquidityInput
          balance="12 LSP"
          value={6}
          currency="BTC"
          currencySrc={btcLogo}
          className="mt-3"
          innerRef={register}
          name="two"
        />
        <Button
          htmlType="submit"
          variant="primary"
          content="Add Liquidity"
          fontWeight={500}
          className={styles.btn}
        />
      </form>
    </div>
  );
};

export default AddLiquidity;
