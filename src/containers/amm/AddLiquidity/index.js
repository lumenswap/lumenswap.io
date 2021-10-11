import React, { useEffect } from 'react';
import Image from 'next/image';
import BN from 'helpers/BN';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import CSelectToken from 'components/CSelectToken';
import Button from 'components/Button';
import LiquidityInput from 'components/LiquidityInput';
import AMMCurrentPrice from 'components/AMMCurrentPrice';
import { closeModalAction, openModalAction } from 'actions/modal';
import isSameAsset from 'helpers/isSameAsset';
import numeral from 'numeral';
import AMMPriceInput from 'containers/amm/AMMPriceInput';
import getAssetDetails from 'helpers/getAssetDetails';
import XLM from 'tokens/XLM';
import LSP from 'tokens/LSP';
import ConfirmLiquidity from '../ConfirmLiquidity';
import styles from './styles.module.scss';

const setLabel = (name, src) => (
  <div className="d-flex align-items-center">
    <Image src={src} width={20} height={20} alt={name} />
    <span className="ml-2">{name}</span>
  </div>
);

const AddLiquidity = ({ tokenA, tokenB, selectAsset }) => {
  const userBalance = useSelector((state) => state.userBalance);

  const defaultTokensData = {
    tokenA: {
      ...XLM,
      balance:
      numeral(userBalance.find((balance) => isSameAsset(
        balance.asset, getAssetDetails(XLM),
      ))?.balance).format('0,0.[0000000]')
        ?? 0,
    },
    tokenB: {
      ...getAssetDetails(LSP),
      balance:
      numeral(userBalance.find((balance) => isSameAsset(
        balance.asset, getAssetDetails(LSP),
      ))?.balance).format('0,0.[0000000]')
       ?? 0,
    },
  };
  let mainTokenA = { ...tokenA?.details, logo: tokenA?.logo, balance: tokenA?.balance };
  let mainTokenB = { ...tokenB?.details, logo: tokenB?.logo, balance: tokenB?.balance };
  if (!tokenA) {
    mainTokenA = defaultTokensData.tokenA;
  }
  if (!tokenB) {
    mainTokenB = defaultTokensData.tokenB;
  }

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
    defaultValues: {
      maxPrice: 1,
      minPrice: 0,
    },
  });

  const onSubmit = (data) => {
    dispatch(closeModalAction());
    const confirmData = {
      tokenA: {
        logo: mainTokenA.logo,
        code: mainTokenA.code,
        balance: data.amountTokenA,
      },
      tokenB: {
        logo: mainTokenB.logo,
        code: mainTokenB.code,
        balance: data.amountTokenB,
      },
    };
    dispatch(closeModalAction());
    dispatch(
      openModalAction({
        modalProps: {
          title: 'Deposit Liquidity Confirm',
          className: 'main',
        },
        content: <ConfirmLiquidity
          data={confirmData}
        />,
      }),
    );
  };

  const currentCurrency = {
    pair1: { value: '14', currency: mainTokenA.code },
    pair2: { value: '1', currency: mainTokenB.code },
  };
  useEffect(() => {
    trigger();
  }, [JSON.stringify(getValues())]);

  function errorGenerator() {
    for (const error of Object.values(errors)) {
      if (error.message) {
        return error.message;
      }
    }
    return 'Create';
  }

  const handleSelectAsset = (token) => {
    function onTokenSelect(asset) {
      selectAsset(token, asset);
    }
    dispatch(
      openModalAction({
        modalProps: {
          title: 'Select asset',
          className: 'main',
        },
        content: <CSelectToken onTokenSelect={onTokenSelect} />,
      }),
    );
  };
  const validateAmountTokenA = (value) => {
    if (new BN(0).gt(value)) {
      return 'Amount is not valid';
    }
    if (new BN(value).gt(mainTokenA.balance)) {
      return 'Insufficient balance';
    }
    return true;
  };
  const validateAmountTokenB = (value) => {
    if (new BN(0).gt(value)) {
      return 'Amount is not valid';
    }
    if (new BN(value).gt(mainTokenB.balance)) {
      return 'Insufficient balance';
    }
    return true;
  };

  const validateMinPrice = (value) => {
    if (value < 0) {
      return 'Min price is not valid';
    }
    if (new BN(value).gt(getValues('maxPrice')) || value === getValues('maxPrice')) {
      return 'Max price should be bigger';
    }
    return true;
  };

  const validateMaxPrice = (value) => {
    if (value < 0) {
      return 'Max price is not valid';
    }
    if (new BN(getValues('minPrice')).gt(value) || value === getValues('minPrice')) {
      return 'Max price should be bigger';
    }
    return true;
  };

  return (
    <div className="pb-4">
      <h6 className={styles.label}>Select pair</h6>
      <div className="d-flex justify-content-between">
        <div className={styles.select} onClick={() => handleSelectAsset('tokenA')}>
          {setLabel(mainTokenA.code, mainTokenA.logo)}
          <span className="icon-angle-down" />
        </div>
        <div className={styles.select} onClick={() => handleSelectAsset('tokenB')}>
          {setLabel(mainTokenB.code, mainTokenB.logo)}
          <span className="icon-angle-down" />
        </div>
      </div>

      <div className={styles.current}><AMMCurrentPrice pairs={currentCurrency} /></div>

      <hr className={styles.hr} />

      <h6 className={styles.label}>Deposit liquidity</h6>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="amountTokenA"
          control={control}
          rules={{
            required: 'Amount is required',
            validate: validateAmountTokenA,
          }}
          render={(props) => (
            <LiquidityInput
              balance={`${numeral(mainTokenA.balance).format('0,0.[0000000]')} ${mainTokenA.code}`}
              currency={mainTokenA.code}
              onChange={props.onChange}
              value={props.value}
              currencySrc={mainTokenA.logo}
            />
          )}
        />
        <Controller
          name="amountTokenB"
          control={control}
          rules={{
            required: 'Amount is required',
            validate: validateAmountTokenB,
          }}
          render={(props) => (
            <LiquidityInput
              onChange={props.onChange}
              value={props.value}
              balance={`${numeral(mainTokenB.balance).format('0,0.[0000000]')} ${mainTokenB.code}`}
              currency={mainTokenB.code}
              currencySrc={mainTokenB.logo}
              className="mt-3"
            />
          )}
        />
        <div className={styles['footer-inputs-container']}>
          <Controller
            name="minPrice"
            control={control}
            rules={{
              required: 'Min price is required',
              validate: validateMinPrice,
            }}
            render={(props) => (
              <AMMPriceInput
                onChange={props.onChange}
                value={props.value}
                defaultValue={0}
                token={mainTokenA}
                type="Min"
              />
            )}
          />
          <Controller
            name="maxPrice"
            control={control}
            rules={{
              required: 'Max price is required',
              validate: validateMaxPrice,
            }}
            render={(props) => (
              <AMMPriceInput
                onChange={props.onChange}
                value={props.value}
                defaultValue={1}
                token={mainTokenA}
                type="Max"
              />
            )}
          />
        </div>

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
};

export default AddLiquidity;
