import { useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import { Controller, useForm } from 'react-hook-form';
import ModalDialog from 'components/ModalDialog';
import ConfirmSwap from 'blocks/ConfirmSwap';
import Header from 'components/Header';
import LCurrencyInput from 'components/LCurrencyInput';
import XLM from 'tokens/XLM';
import LPriceSpreadSection from 'components/LPriceSpreadSection';
import calculateSendEstimatedAndPath from 'helpers/calculateSendEstimatedAndPath';
import calculateReceiveEstimatedAndPath from 'helpers/calculateReceiveEstimatedAndPath';
import getAssetDetails from 'helpers/getAssetDetails';
import BN from 'helpers/BN';
import { openConnectModal, openModalAction } from 'actions/modal';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import isSameAsset from 'helpers/isSameAsset';
import AddAsset from 'blocks/AddAsset';
import minimizeAddress from 'helpers/minimizeAddress';
import questionLogo from 'assets/images/question.png';
import ExchangeRate from 'containers/swap/ExchangeRate';
import SwapButton from 'containers/swap/SwapButton';
import SwapHead from 'containers/swap/SwapHead';
import styles from './styles.module.scss';

const REQ_TIMEOUT_MS = 1000;

const SwapPage = ({ tokens }) => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [paths, setPaths] = useState([]);
  const isLogged = useSelector((state) => state.user.logged);
  const userCustomTokens = useSelector((state) => state.userCustomTokens);
  const router = useRouter();
  const dispatch = useDispatch();
  const timeoutRef = useRef();

  const {
    handleSubmit, control, setValue, getValues, watch,
  } = useForm({
    defaultValues: {
      from: {
        asset: {
          details: getAssetDetails(XLM),
          logo: XLM.logo,
          web: XLM.web,
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

  useEffect(() => {
    if (tokens) {
      const formValues = getValues();

      setValue('to', {
        amount: formValues.to.amount,
        asset: {
          logo: tokens.to.logo,
          web: tokens.to.web,
          details: getAssetDetails(tokens.to),
        },
      });

      setValue('from', {
        amount: formValues.from.amount,
        asset: {
          logo: tokens.from.logo,
          web: tokens.from.web,
          details: getAssetDetails(tokens.from),
        },
      });
    }
  }, [tokens]);

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
          formValues.from.asset.details,
          formValues.to.asset.details,
        )
          .then((res) => {
            setEstimatedPrice(res.minAmount);
            setPaths(res.path);
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
          formValues.from.asset.details,
          formValues.to.asset.details,
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

    if (formValues.to.asset === null) {
      return;
    }

    setValue('from', {
      asset: formValues.to.asset,
      amount: formValues.to.amount,
    });
    setValue('to', { asset: formValues.from.asset, amount: '' });
    changeFromInput(formValues.to.amount);

    const isFromCustomToken = userCustomTokens
      .find((token) => isSameAsset(getAssetDetails(token), getValues().from.asset?.details));

    const isToCustomToken = userCustomTokens
      .find((token) => isSameAsset(getAssetDetails(token), getValues().to.asset?.details));

    if (isFromCustomToken || isToCustomToken) router.push('/swap/custom');
    else {
      router.push(
        `/swap/${formValues.to.asset.details.code}-${formValues.from.asset.details.code}`,
      );
    }
  }

  function changeToAsset(asset) {
    const formValues = getValues();
    setValue('to', { asset, amount: formValues.to.amount });
  }

  useEffect(() => {
    if (!tokens && router.query.custom) {
      const extracted = router.query.custom.split('-');
      const found = userCustomTokens
        .find((i) => isSameAsset(i, getAssetDetails({ code: extracted[0], issuer: extracted[1] })));
      if (router.pathname === '/swap' && router.query && !found) {
        dispatch(openModalAction({
          modalProps: { title: 'Add custom asset' },
          content: <AddAsset changeToAsset={changeToAsset} />,
        }));
      } else if (found) {
        changeToAsset({
          details: found,
          web: minimizeAddress(found.getIssuer()),
          logo: questionLogo,
        });
      }
    }
  }, [
    router.pathname,
    router.query,
  ]);

  const showAdvanced = !new BN(watch('from').amount).isNaN()
    && !new BN(watch('from').amount).isEqualTo(0)
    && watch('to').asset !== null;

  return (
    <div className="container-fluid main">
      <SwapHead tokens={tokens} />
      <Header />
      <div className="row justify-content-center">
        <div className="col-auto">
          <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.card}>
              <Controller
                name="from"
                control={control}
                render={(props) => (
                  <LCurrencyInput
                    {...props}
                    showMax
                    label="From"
                    onChangeInput={changeFromInput}
                    originChange={changeFromInput}
                    getFormValues={getValues}
                    swapFromWithTo={swapFromWithTo}
                    changeToAsset={changeToAsset}
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
                render={(props) => (
                  <LCurrencyInput
                    {...props}
                    label="To (estimated)"
                    onChangeInput={changeToInput}
                    originChange={changeFromInput}
                    getFormValues={getValues}
                    swapFromWithTo={swapFromWithTo}
                    changeToAsset={changeToAsset}
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
                  render={(props) => (
                    <LPriceSpreadSection
                      {...props}
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

export default SwapPage;
