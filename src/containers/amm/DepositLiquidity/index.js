import React, { useEffect } from 'react';
import Image from 'next/image';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import Button from 'components/Button';
import LiquidityInput from 'components/LiquidityInput';
import AMMCurrentPrice from 'components/AMMCurrentPrice';
import { openModalAction } from 'actions/modal';
import DepositLiquidityConfirm from 'containers/amm/DepositLiquidityConfirm';
import BN from 'helpers/BN';
import AMMPriceInput from 'containers/amm/AMMPriceInput';
import getAssetDetails from 'helpers/getAssetDetails';
import { getLiquidityPoolIdFromAssets, lexoOrderAssets } from 'helpers/stellarPool';
import { getPoolDetailsById } from 'api/stellarPool';
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

function DepositLiquidity({ tokenA, tokenB }) {
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
      maxPrice: 2,
      minPrice: 1,
    },
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

    dispatch(
      openModalAction({
        modalProps: {
          title: 'Deposit Liquidity Confirm',
          className: 'main',
        },
        content: <DepositLiquidityConfirm
          data={confirmData}
        />,
      }),
    );
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
    return 'Deposit';
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

  const validateAmountTokenA = (value) => {
    if (new BN(value).gt(tokenA.balance)) {
      return 'Insufficient balance';
    }
    if (new BN(0).gt(value)) {
      return 'Amount is not valid';
    }
    if (new BN(0).isEqualTo(value)) {
      return 'Amount is not valid';
    }
    return true;
  };

  const validateAmountTokenB = (value) => {
    if (new BN(value).gt(tokenB.balance)) {
      return 'Insufficient balance';
    }
    if (new BN(0).gt(value)) {
      return 'Amount is not valid';
    }
    if (new BN(0).isEqualTo(value)) {
      return 'Amount is not valid';
    }
    return true;
  };

  const validateMinPrice = (value) => {
    if (new BN(0).gt(value)) {
      return 'Min price is not valid';
    }
    if (new BN(0).isEqualTo(value)) {
      return 'Min price is not valid';
    }
    if (new BN(value).gt(getValues('maxPrice')) || value === getValues('maxPrice')) {
      return 'Max price should be bigger';
    }
    return true;
  };

  const validateMaxPrice = (value) => {
    if (new BN(0).gt(value)) {
      return 'Max price is not valid';
    }
    if (new BN(getValues('minPrice')).gt(value) || value === getValues('minPrice')) {
      return 'Max price should be bigger';
    }
    return true;
  };

  useEffect(() => {
    async function loadData() {
      const poolId = getLiquidityPoolIdFromAssets(
        getAssetDetails(tokenA.details),
        getAssetDetails(tokenB.details),
      );

      try {
        const poolDetail = await getPoolDetailsById(poolId);
        setPoolData(poolDetail);
      } catch (e) {
        const sortedTokens = lexoOrderAssets(
          getAssetDetails(tokenA.details),
          getAssetDetails(tokenB.details),
        );

        const assetA = sortedTokens[0].isNative() ? 'native' : `${sortedTokens[0].getCode()}:${sortedTokens[0].getIssuer()}`;
        const assetB = sortedTokens[1].isNative() ? 'native' : `${sortedTokens[1].getCode()}:${sortedTokens[1].getIssuer()}`;

        setPoolData({
          reserves: [
            {
              asset: assetA,
              amount: 0,
            },
            {
              asset: assetB,
              amount: 0,
            },
          ],
        });
      }
    }

    loadData();
  }, [tokenA, tokenB]);

  return (
    <div className="pb-4">
      <h6 className={styles.label}>Inpool</h6>
      <div>
        {inpoolData.map((token) => <Inpool token={token} />)}

      </div>
      <div className="d-flex justify-content-between" />

      <div className={styles.current}><AMMCurrentPrice poolData={poolData} /></div>

      <hr className={styles.hr} />

      <h6 className={styles.label}>Deposit Liquidity</h6>
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
            validate: validateAmountTokenB,
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
                token={tokenA}
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
                token={tokenA}
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
}

export default DepositLiquidity;
