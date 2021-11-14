import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'components/Button';
import { openModalAction } from 'actions/modal';
import WithdrawLiquidityConfirm from 'containers/amm/WithdrawLiquidityConfirm';
import { getLiquidityPoolIdFromAssets, lexoOrderAssets } from 'helpers/stellarPool';
import getAssetDetails from 'helpers/getAssetDetails';
import { getPoolDetailsById } from 'api/stellarPool';
import { extractLogo } from 'helpers/assetUtils';
import humanAmount from 'helpers/humanAmount';
import { fetchAccountDetails } from 'api/stellar';
import BN from 'helpers/BN';
import WithdrawLiquiditySliderInput from '../WithdrawLiquiditySliderInput';
import styles from './styles.module.scss';

function Inpool({ token, isLoading }) {
  return (
    <div className={styles.inpool}>
      <div>
        <div><Image src={token.logo} width={20} height={20} /></div>
        <span>{token.code}</span>
      </div>
      <div>{isLoading ? '' : humanAmount(token.balance)}</div>
    </div>
  );
}

function WithdrawLiquidity({ tokenA: initTokenA, tokenB: initTokenB, afterWithdraw = () => {} }) {
  const dispatch = useDispatch();
  const [poolData, setPoolData] = useState(null);
  const [userShare, setUserShare] = useState(null);
  const userAddress = useSelector((state) => state.user.detail.address);
  const [tokenA, tokenB] = lexoOrderAssets(initTokenA, initTokenB);

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
    const shareA = new BN(userShare)
      .times(poolData.reserves[0].amount)
      .div(poolData.total_shares)
      .times(new BN(data.withdrawPercent).div(100));
    const shareB = new BN(userShare)
      .times(poolData.reserves[1].amount)
      .div(poolData.total_shares)
      .times(new BN(data.withdrawPercent).div(100));

    const confirmData = {
      tokenA: {
        ...tokenA,
        balance: shareA,
      },
      tokenB: {
        ...tokenB,
        balance: shareB,
      },
      tolerance: '0.003',
      withdrawPercent: data.withdrawPercent,
      poolData,
      userShare: new BN(userShare).times(new BN(data.withdrawPercent).div(100)),
    };

    dispatch(
      openModalAction({
        modalProps: {
          title: 'Withdraw Liquidity Confirm',
          className: 'main',
        },
        content: <WithdrawLiquidityConfirm
          data={confirmData}
          afterWithdraw={afterWithdraw}
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

    return 'Withdraw';
  }

  let shareA = '0';
  let shareB = '0';
  if (poolData) {
    shareA = new BN(userShare)
      .times(poolData.reserves[0].amount)
      .div(poolData.total_shares);
    shareB = new BN(userShare)
      .times(poolData.reserves[1].amount)
      .div(poolData.total_shares);
  }

  const inpoolData = [
    {
      logo: extractLogo(tokenA),
      code: tokenA.code,
      balance: poolData ? shareA.toFixed(7) : '',
    },
    {
      logo: extractLogo(tokenB),
      code: tokenB.code,
      balance: poolData ? shareB.toFixed(7) : '',
    },
  ];

  useEffect(() => {
    async function loadData() {
      const poolId = getLiquidityPoolIdFromAssets(
        getAssetDetails(tokenA),
        getAssetDetails(tokenB),
      );

      let poolDetail;
      try {
        poolDetail = await getPoolDetailsById(poolId);
        setPoolData(poolDetail);
      } catch (e) {
        const sortedTokens = lexoOrderAssets(
          getAssetDetails(tokenA),
          getAssetDetails(tokenB),
        );

        const assetA = sortedTokens[0].isNative() ? 'native' : `${sortedTokens[0].getCode()}:${sortedTokens[0].getIssuer()}`;
        const assetB = sortedTokens[1].isNative() ? 'native' : `${sortedTokens[1].getCode()}:${sortedTokens[1].getIssuer()}`;

        poolDetail = {
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
        };
        setPoolData(poolDetail);
      }

      try {
        const userData = await fetchAccountDetails(userAddress);
        for (const balance of userData.balances) {
          if (balance.asset_type === 'liquidity_pool_shares' && balance.liquidity_pool_id === poolDetail.id) {
            setUserShare(balance.balance);
            return;
          }
        }

        setUserShare(0);
      } catch (e) {
        setUserShare(0);
      }
    }

    loadData();
  }, [tokenA, tokenB]);

  return (
    <div className="pb-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h6 className={styles.label}>Inpool</h6>
        <div>
          {inpoolData.map((token) => (
            <Inpool
              token={token}
              isLoading={poolData === null || userShare === null}
            />
          ))}

        </div>

        <hr className={styles.hr} />
        <div className="d-flex flex-column justify-content-between">
          <Controller
            name="withdrawPercent"
            control={control}
            defaultValue={1}
            render={(props) => <WithdrawLiquiditySliderInput {...props} />}
          />
          <div className={styles['footer-section']}>
            <div className={styles['footer-items']}>
              {inpoolData.map((inpool) => (
                <div className={styles['footer-item']}>
                  <div className={styles['footer-first-section']}>
                    <div className={styles['footer-img']}><Image src={inpool.logo} width={20} height={20} /></div>
                    <span className={styles['footer-code']}>{inpool.code}</span>
                  </div>
                  <span className={styles['footer-balance']}>
                    {`${new BN(inpool.balance).times(new BN(getValues().withdrawPercent).div(100))}`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Button
          htmlType="submit"
          variant="primary"
          content={errorGenerator()}
          fontWeight={500}
          className={styles.btn}
          disabled={
            !formState.isValid
            || formState.isValidating
            || poolData === null
            || userShare === null
          }
        />
      </form>
    </div>
  );
}

export default WithdrawLiquidity;
