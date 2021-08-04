import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Controller, useForm } from 'react-hook-form';
import ModalDialog from 'components/ModalDialog';
import ConfirmSwap from 'blocks/ConfirmSwap';
import Header from 'components/Header';
import LCurrencyInput from 'components/LCurrencyInput';
import XLM from 'tokens/XLM';
import LPriceSpreadSection from 'components/LPriceSpreadSection';
import USDC from 'tokens/USDC';
import calculateSendEstimatedAndPath from 'helpers/calculateSendEstimatedAndPath';
import calculateReceiveEstimatedAndPath from 'helpers/calculateReceiveEstimatedAndPath';
import getAssetDetails from 'helpers/getAssetDetails';
import BN from 'helpers/BN';
import defaultTokens from 'tokens/defaultTokens';
import { openConnectModal, openModalAction } from 'actions/modal';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import isSameAsset from 'helpers/isSameAsset';
import AddAsset from 'blocks/AddAsset';
import minimizeAddress from 'helpers/minimizeAddress';
import questionLogo from 'assets/images/question.png';
import ExchangeRate from 'containers/swap/ExchangeRate';
import SwapButton from 'page-scripts/swap/SwapButton';
import Head from 'next/head';
import styles from './styles.module.scss';

const SwapPage = ({ tokens }) => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [paths, setPaths] = useState([]);
  const isLogged = useSelector((state) => state.user.logged);
  const userCustomTokens = useSelector((state) => state.userCustomTokens);
  const router = useRouter();
  const dispatch = useDispatch();

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
        asset: {
          details: getAssetDetails(USDC),
          logo: USDC.logo,
          web: USDC.web,
        },
        amount: null,
      },
      priceSpread: '0.1',
    },
  });

  const tokensValid = (tokenString) => tokenString.split('-').length === 2;

  const isNotSame = (queryTokens, formValues) => {
    if (queryTokens && tokensValid(queryTokens)) {
      const from = queryTokens.split('-')[0];
      const to = queryTokens.split('-')[1];

      if (
        from === formValues.from.asset.details.code
        || to === formValues.to.asset.details.code
      ) {
        return false;
      }
      return true;
    }
    return false;
  };
  useEffect(() => {
    const formValues = getValues();

    if (tokens && isNotSame(tokens, formValues)) {
      if (tokensValid(tokens)) {
        const fromToken = tokens.split('-')[0].toLowerCase();
        const toToken = tokens.split('-')[1].toLowerCase();

        const tokenCodes = defaultTokens.map((token) => token.code.toLowerCase());

        if (tokenCodes.includes(fromToken) && tokenCodes.includes(toToken)) {
          const fromTokenDetails = defaultTokens.find(
            (token) => token.code.toLowerCase() === fromToken,
          );
          const toTokenDetails = defaultTokens.find(
            (token) => token.code.toLowerCase() === toToken,
          );

          setValue('to', {
            amount: null,
            asset: {
              logo: toTokenDetails.logo,
              web: toTokenDetails.web,
              details: getAssetDetails(toTokenDetails),
            },
          });

          setValue('from', {
            amount: null,
            asset: {
              logo: fromTokenDetails.logo,
              web: fromTokenDetails.web,
              details: getAssetDetails(fromTokenDetails),
            },
          });
        } else {
          setError('Invalid Tokens!');
        }
      } else {
        setError('Invalid Tokens!');
      }
    }
  }, []);

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
    if (amount && !new BN(amount).isEqualTo(0)) {
      setLoading(true);
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
    }

    if (amount === null || new BN(amount).isEqualTo(0)) {
      setValue('to', {
        ...formValues.to,
        amount: '',
      });
    }
  }

  function changeToInput(amount) {
    const formValues = getValues();
    if (amount && !new BN(amount).isEqualTo(0)) {
      setLoading(true);
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
    }

    if (amount === null || new BN(amount).isEqualTo(0)) {
      setValue('from', {
        ...formValues.from,
        amount: '',
      });
    }
  }

  function swapFromWithTo() {
    const formValues = getValues();
    setValue('from', {
      asset: formValues.to.asset,
      amount: formValues.to.amount,
    });
    setValue('to', { asset: formValues.from.asset, amount: '' });
    changeFromInput(formValues.to.amount);
  }

  function changeToAsset(asset) {
    const formValues = getValues();
    setValue('to', { asset, amount: formValues.to.amount });
  }

  // useEffect(() => {
  //   const extracted = router.query.slice(1).split('-');
  //   const found = userCustomTokens
  //     .find((i) => isSameAsset(i, getAssetDetails({ code: extracted[0], issuer: extracted[1] })));
  //   if (router.pathname === '/swap' && router.query && !found) {
  //     openModalAction({
  //       modalProps: { title: 'Add custom asset' },
  //       content: <AddAsset changeToAsset={changeToAsset} />,
  //     });
  //   } else if (found) {
  //     changeToAsset({
  //       details: found,
  //       web: minimizeAddress(found.getIssuer()),
  //       logo: questionLogo.src,
  //     });
  //   }
  // }, [
  //   router.pathname,
  //   router.query,
  // ]);

  const showAdvanced = !new BN(watch('from').amount).isNaN()
    && !new BN(watch('from').amount).isEqualTo(0);

  return (
    <div className="container-fluid main">
      <Head>
        {tokens && tokensValid(tokens) ? (
          <title>
            Lumenswap |{' '}
            {`${tokens.split('-')[0].toUpperCase()}-${tokens
              .split('-')[1]
              .toUpperCase()}`}
          </title>
        ) : (
          <title>Lumenswap | Swap</title>
        )}
      </Head>
      <Header />
      <div className="row justify-content-center">
        {error ? (
          <div className="col-auto">{error}</div>
        ) : (
          <div className="col-auto">
            <form
              className={styles.container}
              onSubmit={handleSubmit(onSubmit)}
            >
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
        )}
      </div>
    </div>
  );
};

export default SwapPage;
