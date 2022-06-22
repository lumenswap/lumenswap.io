import { useState, useRef } from 'react';
import Error from 'containers/404';
import classNames from 'classnames';
import urlMaker from 'helpers/urlMaker';
import { Controller, useForm } from 'react-hook-form';
import ModalDialog from 'components/ModalDialog';
import ConfirmSwap from 'components/complex/LumenSwapSwap/ConfirmSwap';
import AMMHeader from 'containers/amm/AMMHeader';
import LPriceSpreadSection from 'components/complex/LumenSwapSwap/LPriceSpreadSection';
import calculateSendEstimatedAndPath from 'api/swapAPI/calculateSendEstimatedAndPath';
import calculateReceiveEstimatedAndPath from 'api/swapAPI/calculateReceiveEstimatedAndPath';
import { getAssetDetails, getSingleToken, isSameAsset } from 'helpers/asset';
import BN from 'helpers/BN';
import { openConnectModal, openModalAction } from 'actions/modal';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import ObmHeader from 'containers/obm/ObmHeader';
import { walletTypes } from 'components/complex/LumenSwapWallet/walletData';
import useDefaultTokens from 'hooks/useDefaultTokens';
import { changeToAsset } from './swapHelpers';
import SwapHead from './SwapHead';
import useUrl from './useUrl';
import SwapButton from './SwapButton';
import ExchangeRate from './ExchangeRate';
import LCurrencyInput from './LCurrencyInput';
import styles from './styles.module.scss';

const REQ_TIMEOUT_MS = 1000;

const LumenSwapSwap = ({
  custom, errorCode, type = walletTypes.OBM,
}) => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [paths, setPaths] = useState([]);
  const isLogged = useSelector((state) => state.user.logged);
  const userCustomTokens = useSelector((state) => state.userCustomTokens);
  const router = useRouter();
  const dispatch = useDispatch();
  const timeoutRef = useRef();
  const defaultTokens = useDefaultTokens();
  const XLM = getSingleToken('XLM', defaultTokens);

  let swapBaseURL = urlMaker.obm.swap;
  if (type === 'amm') {
    swapBaseURL = urlMaker.amm.swap;
  }

  const {
    handleSubmit, control, setValue, getValues, watch,
  } = useForm({
    defaultValues: {
      from: {
        asset: {
          details: XLM,
          logo: XLM?.logo,
          web: XLM?.web,
        },
        amount: null,
      },
      to: {
        asset: null,
        amount: null,
      },
      priceSpread: '0.1',
    },
  });

  const onSubmit = (data) => {
    if (!isLogged) {
      dispatch(openConnectModal());
    } else {
      dispatch(
        openModalAction({
          modalProps: {
            title: 'Confirm Swap',
          },
          content: <ConfirmSwap data={{ ...data, estimatedPrice, paths }} />,
        }),
      );
    }
  };

  function changeFromInput(amount) {
    const formValues = getValues();
    setValue('from', {
      ...formValues.from,
      amount,
    });
    setValue('to', {
      ...formValues.to,
      amount: 0,
    });
    if (formValues.to.asset === null) {
      return;
    }
    if (amount && !new BN(amount).isEqualTo(0)) {
      setLoading(true);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        calculateSendEstimatedAndPath(
          amount,
          getAssetDetails(formValues.from.asset.details),
          getAssetDetails(formValues.to.asset.details),
        )
          .then((res) => {
            setEstimatedPrice(res.minAmount);
            setPaths(res.path);
            setValue('from', {
              ...formValues.from,
              amount,
            });
            setValue('to', {
              ...formValues.to,
              amount: res.minAmount,
            });
          })
          .finally(() => {
            setLoading(false);
          });
      }, REQ_TIMEOUT_MS);
    }

    if (amount === null || new BN(amount).isEqualTo(0)) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      setValue('to', {
        ...formValues.to,
        amount: '',
      });
    }
  }

  function changeToInput(amount) {
    const formValues = getValues();
    if (formValues.to.asset === null) {
      return;
    }

    if (amount && !new BN(amount).isEqualTo(0)) {
      setLoading(true);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        calculateReceiveEstimatedAndPath(
          amount,
          getAssetDetails(formValues.from.asset.details),
          getAssetDetails(formValues.to.asset.details),
        )
          .then((res) => {
            setEstimatedPrice(amount);
            setPaths(res.path.reverse());
            setValue('from', {
              ...formValues.from,
              amount: res.minAmount,
            });
          })
          .finally(() => {
            setLoading(false);
          });
      }, REQ_TIMEOUT_MS);
    }

    if (amount === null || new BN(amount).isEqualTo(0)) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      setValue('from', {
        ...formValues.from,
        amount: '',
      });
    }
  }

  function swapFromWithTo() {
    const formValues = getValues();
    const fromAssetDetails = getAssetDetails(formValues.from.asset?.details);
    let toAssetDetails = null;

    if (getValues().to?.asset?.details) {
      toAssetDetails = getAssetDetails(formValues.to?.asset?.details);
    }

    if (formValues.to.asset === null) {
      return;
    }

    setValue('from', {
      asset: formValues.to.asset,
      amount: '',
    });
    setValue('to', {
      asset: formValues.from.asset,
      amount: formValues.from.amount,
    });
    changeToInput(formValues.from.amount);

    const isFromCustomToken = userCustomTokens
      .find((token) => isSameAsset(getAssetDetails(token), fromAssetDetails));

    const isToCustomToken = userCustomTokens
      .find((token) => isSameAsset(getAssetDetails(token), toAssetDetails));

    if (isFromCustomToken && !isToCustomToken) {
      const toAsset = { ...toAssetDetails };
      toAsset.isDefault = true;
      router.push(
        swapBaseURL.custom(
          isFromCustomToken.code,
          isFromCustomToken.issuer === 'native'
            ? null
            : isFromCustomToken.issuer,
          toAsset.code,
          toAsset.issuer === 'native' ? null : toAsset.issuer,
        ),
      );
    } else if (isToCustomToken && !isFromCustomToken) {
      const fromAsset = { ...fromAssetDetails };
      fromAsset.isDefault = true;
      router.push(
        swapBaseURL.custom(
          fromAsset.code,
          fromAsset.issuer === 'native' ? null : fromAsset.issuer,
          isToCustomToken.code,
          isToCustomToken.issuer === 'native' ? null : isToCustomToken.issuer,
        ),
      );
    } else if (isFromCustomToken && isToCustomToken) {
      router.push(
        swapBaseURL.custom(
          isFromCustomToken.code,
          isFromCustomToken.issuer === 'native'
            ? null
            : isFromCustomToken.issuer,
          isToCustomToken.code,
          isToCustomToken.issuer === 'native' ? null : isToCustomToken.issuer,
        ),
      );
    } else {
      router.push(
        swapBaseURL.custom(
          formValues.to.asset.details.code,
          null,
          formValues.from.asset.details.code,
          null,
        ),
      );
    }
  }

  useUrl(custom, setValue, getValues, [custom]);

  const showAdvanced = !new BN(watch('from').amount).isNaN()
    && !new BN(watch('from').amount).isEqualTo(0)
    && watch('to').asset !== null;

  if (errorCode === 404) {
    return <Error />;
  }

  return (
    <div className="container-fluid main">
      <SwapHead custom={custom} baseURL={swapBaseURL} />
      {type === 'obm' ? <ObmHeader /> : <AMMHeader />}
      <div className="row justify-content-center">
        <div className="col-auto">
          <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.card}>
              <Controller
                name="from"
                control={control}
                render={({ field }) => (
                  <LCurrencyInput
                    value={field.value}
                    onChange={field.onChange}
                    baseURL={swapBaseURL}
                    ref={null}
                    showMax
                    label="From"
                    onChangeInput={changeFromInput}
                    originChange={changeFromInput}
                    getFormValues={getValues}
                    swapFromWithTo={swapFromWithTo}
                    type={type}
                    changeToAsset={(asset) => changeToAsset(asset, setValue, getValues)}
                  />
                )}
              />
              <div className="my-2 text-center">
                <span
                  className={classNames(
                    'icon-arrow-down',
                    styles['icon-arrow-down'],
                  )}
                  onClick={swapFromWithTo}
                />
              </div>
              <Controller
                name="to"
                control={control}
                render={({ field }) => (
                  <LCurrencyInput
                    value={field.value}
                    onChange={field.onChange}
                    baseURL={swapBaseURL}
                    ref={null}
                    label="To (estimated)"
                    onChangeInput={changeToInput}
                    originChange={changeFromInput}
                    getFormValues={getValues}
                    swapFromWithTo={swapFromWithTo}
                    type={type}
                    changeToAsset={(asset) => changeToAsset(asset, setValue, getValues)}
                    defaultTokens={defaultTokens}
                  />
                )}
              />
              <ExchangeRate
                control={control}
                estimatedPrice={estimatedPrice}
                loading={loading}
              />
              <SwapButton control={control} />
              <ModalDialog show={show} setShow={setShow} title="Confirm Swap">
                <ConfirmSwap />
              </ModalDialog>
            </div>
            {showAdvanced && (
              <div className={styles['swap-info']}>
                <Controller
                  name="priceSpread"
                  control={control}
                  render={({ field }) => (
                    <LPriceSpreadSection
                      value={field.value}
                      onChange={field.onChange}
                      ref={null}
                      control={control}
                      estimatedPrice={estimatedPrice}
                      paths={paths}
                      upperLoading={loading}
                    />
                  )}
                />
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LumenSwapSwap;
