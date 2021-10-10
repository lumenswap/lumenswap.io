import React, { useEffect } from 'react';
import Image from 'next/image';
import BN from 'helpers/BN';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import Button from 'components/Button';
import LiquidityInput from 'components/LiquidityInput';
import AMMCurrentPrice from 'components/AMMCurrentPrice';
import { closeModalAction, openModalAction } from 'actions/modal';
import WithdrawLiquidityConfirm from 'containers/amm/WithdrawLiquidityConfirm';
import styles from './styles.module.scss';

function Inpool({ token }) {
  return (
    <div className={styles.inpool}>
      <div>
        <div><Image src={token.logo} width={20} height={20} /></div>
        <span>{token.code}</span>
      </div>
      <div>{token.balance}</div>
    </div>
  );
}

function WithdrawLiquidity({ tokenA, tokenB }) {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    formState,
    errors,
    trigger,
    getValues,
  } = useForm({
    mode: 'onChange',
  });
  const onSubmit = (data) => {
    const confirmData = {
      tokenA: {
        logo: tokenA.logo,
        code: tokenA.code,
        balance: data.amountTokenA,
      },
      tokenB: {
        logo: tokenB.logo,
        code: tokenB.code,
        balance: data.amountTokenB,
      },
    };
    dispatch(closeModalAction());
    dispatch(
      openModalAction({
        modalProps: {
          title: 'Withdraw Liquidity Confirm',
          className: 'main',
        },
        content: <WithdrawLiquidityConfirm
          data={confirmData}
        />,
      }),
    );
  };
  const currentCurrency = {
    pair1: { value: '14', currency: tokenA.code },
    pair2: { value: '1', currency: tokenB.code },
  };
  useEffect(() => {
    trigger();
  }, []);
  useEffect(() => {
    trigger();
  }, [JSON.stringify(getValues())]);
  function errorGenerator() {
    for (const error of Object.values(errors)) {
      if (error.message) {
        return error.message;
      }
    }
    return 'Withdraw';
  }

  const inpoolData = [
    {
      logo: tokenA.logo,
      code: tokenA.code,
      balance: tokenA.balance,
    },
    {
      logo: tokenB.logo,
      code: tokenB.code,
      balance: tokenB.balance,
    },
  ];

  const validateAmountA = (value) => {
    if (new BN(0).gt(value)) {
      return 'Amount is not valid';
    }
    if (new BN(value).gt(tokenA.balance)) {
      return 'Insufficient balance';
    }
    return true;
  };
  const validateAmountB = (value) => {
    if (new BN(0).gt(value)) {
      return 'Amount is not valid';
    }
    if (new BN(value).gt(tokenB.balance)) {
      return 'Insufficient balance';
    }
    return true;
  };

  return (
    <div className="pb-4">
      <h6 className={styles.label}>Inpool</h6>
      <div>
        {inpoolData.map((token) => <Inpool token={token} />)}

      </div>
      <div className="d-flex justify-content-between" />

      <div className={styles.current}><AMMCurrentPrice pairs={currentCurrency} /></div>

      <hr className={styles.hr} />

      <h6 className={styles.label}>Withdraw Liquidity</h6>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="amountTokenA"
          control={control}
          rules={{
            required: 'Amount is required',
            validate: validateAmountA,
          }}
          render={(props) => (
            <LiquidityInput
              balance={`${tokenA.balance} ${tokenA.code}`}
              currency={tokenA.code}
              onChange={props.onChange}
              value={props.value}
              currencySrc={tokenA.logo}
            />
          )}
        />
        <Controller
          name="amountTokenB"
          control={control}
          rules={{
            required: 'Amount is required',
            validate: validateAmountB,
          }}
          render={(props) => (
            <LiquidityInput
              onChange={props.onChange}
              value={props.value}
              balance={`${tokenB.balance} ${tokenB.code}`}
              currency={tokenB.code}
              currencySrc={tokenB.logo}
              className="mt-3"
            />
          )}
        />

        <Button
          htmlType="submit"
          variant="primary"
          content={errorGenerator()}
          fontWeight={500}
          className={styles.btn}
          disabled={!formState.isValid || formState.isValidating}
        />
      </form>
    </div>
  );
}

export default WithdrawLiquidity;
