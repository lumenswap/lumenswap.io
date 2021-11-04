import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'components/Button';
import LiquidityInput from 'components/LiquidityInput';
import AMMCurrentPrice from 'components/AMMCurrentPrice';
import { openModalAction } from 'actions/modal';
import BN from 'helpers/BN';
import getAssetDetails from 'helpers/getAssetDetails';
import { getLiquidityPoolIdFromAssets, lexoOrderAssets } from 'helpers/stellarPool';
import { getPoolDetailsById } from 'api/stellarPool';
import { extractLogo } from 'helpers/assetUtils';
import humanAmount from 'helpers/humanAmount';
import isSameAsset from 'helpers/isSameAsset';
import styles from './styles.module.scss';
import Tolerance from '../Tolerance';
import ConfirmLiquidity from '../ConfirmLiquidity';

function Inpool({ token }) {
  return (
    <div className={styles.inpool}>
      <div>
        <div><Image src={token.logo} width={20} height={20} /></div>
        <span>{token.code}</span>
      </div>
      <div>{humanAmount(token.balance, true)}</div>
    </div>
  );
}

function DepositLiquidity({ tokenA: initTokenA, tokenB: initTokenB, afterDeposit = () => {} }) {
  const dispatch = useDispatch();
  const [poolData, setPoolData] = useState(null);
  const userBalance = useSelector((state) => state.userBalance);
  const [tokenA, tokenB] = lexoOrderAssets(initTokenA, initTokenB);
  const tokenABalance = userBalance
    .find((i) => isSameAsset(getAssetDetails(i.asset), tokenA))
    ?.balance ?? '0';
  const tokenBBalance = userBalance
    .find((i) => isSameAsset(getAssetDetails(i.asset), tokenB))
    ?.balance ?? '0';

  const {
    handleSubmit,
    control,
    formState,
    errors,
    trigger,
    getValues,
    setValue,
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = (data) => {
    const confirmData = {
      tokenA: {
        ...tokenA,
        amount: data.amountTokenA,
      },
      tokenB: {
        ...tokenB,
        amount: data.amountTokenB,
      },
      tolerance: data.tolerance,
      poolData,
    };

    dispatch(
      openModalAction({
        modalProps: {
          title: 'Deposit Liquidity Confirm',
          className: 'main',
        },
        content: <ConfirmLiquidity
          data={confirmData}
          afterDeposit={afterDeposit}
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
      logo: extractLogo(tokenA),
      code: tokenA.code,
      balance: poolData ? poolData.reserves[0].amount : '',
    },
    {
      logo: extractLogo(tokenB),
      code: tokenB.code,
      balance: poolData ? poolData.reserves[1].amount : '',
    },
  ];

  const validateAmountTokenA = (value) => {
    if (new BN(value).gt(tokenABalance)) {
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
    if (new BN(value).gt(tokenBBalance)) {
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

  useEffect(() => {
    async function loadData() {
      const poolId = getLiquidityPoolIdFromAssets(
        getAssetDetails(tokenA),
        getAssetDetails(tokenB),
      );

      try {
        const poolDetail = await getPoolDetailsById(poolId);
        setPoolData(poolDetail);
      } catch (e) {
        const sortedTokens = lexoOrderAssets(
          getAssetDetails(tokenA),
          getAssetDetails(tokenB),
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

  function amountAChange(formChange) {
    return (value) => {
      if (!(new BN(poolData.reserves[0].amount).eq(0)) && value !== '' && value !== '0') {
        const price = new BN(poolData.reserves[1].amount)
          .div(poolData.reserves[0].amount);
        setValue('amountTokenB', new BN(value).times(price).toString());
      }

      formChange(value);
    };
  }

  function amountBChange(formChange) {
    return (value) => {
      if (!(new BN(poolData.reserves[0].amount).eq(0)) && value !== '' && value !== '0') {
        const price = new BN(poolData.reserves[0].amount)
          .div(poolData.reserves[1].amount);
        setValue('amountTokenA', new BN(value).times(price).toString());
      }

      formChange(value);
    };
  }

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
              balance={`${tokenABalance} ${tokenA.code}`}
              currency={tokenA.code}
              onChange={amountAChange(props.onChange)}
              value={props.value}
              currencySrc={extractLogo(tokenA)}
              disabled={poolData === null}
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
              onChange={amountBChange(props.onChange)}
              value={props.value}
              balance={`${tokenBBalance} ${tokenB.code}`}
              currency={tokenB.code}
              currencySrc={extractLogo(tokenB)}
              className="mt-3"
              disabled={poolData === null}
            />
          )}
        />

        <Controller
          name="tolerance"
          control={control}
          rules={{
            required: 'Tolerance is required',
          }}
          defaultValue="0.1"
          render={(props) => (
            <Tolerance
              onChange={props.onChange}
              value={props.value}
            />
          )}
        />

        <Button
          htmlType="submit"
          variant="primary"
          content={errorGenerator()}
          fontWeight={500}
          className={styles.btn}
          disabled={!formState.isValid || formState.isValidating || poolData === null}
        />
      </form>
    </div>
  );
}

export default DepositLiquidity;
