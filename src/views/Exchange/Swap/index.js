import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import arrowDown from 'src/assets/images/arrow-down.png';
import TxnInput from 'src/shared/components/TxnInput';
import showConnectModal from 'src/actions/modal/connectModal';
import { useSelector } from 'react-redux';
import showTokenModal from 'src/actions/modal/tokenModal';
import defaultTokens from 'src/tokens/defaultTokens';
import updateCheckout from 'src/actions/checkout/update';
import cleaerCheckout from 'src/actions/checkout/clear';
import fetchCounterPrice from 'src/helpers/fetchCounterPrice';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import minimizeAddress from 'src/helpers/minimizeAddress';
import history from 'src/history';
import XLM from 'src/tokens/XLM';
import questionLogo from 'src/assets/images/question.png';
import showConfirmSwap from 'src/actions/modal/confirmSwap';
import styles from './styles.less';

const Swap = () => {
  const {
    userLogged, checkout, userToken, user,
  } = useSelector((state) => ({
    userLogged: state.user.logged,
    checkout: state.checkout,
    userToken: state.userToken,
    user: state.user,
  }));
  const [loading, setLoading] = useState(true);
  const {
    setValue, register, getValues,
  } = useForm();
  const { fromCustomAsset, toCustomAsset } = useParams();
  const [swapButtonText, setSwapButtonText] = useState('Enter an amount');

  let includeToken = [];
  let modifiedFromAsset;
  let modifiedToAsset;
  if (fromCustomAsset && toCustomAsset) {
    if (fromCustomAsset === 'XLM') {
      modifiedFromAsset = XLM;
    } else {
      const splittedFrom = fromCustomAsset.split('-');
      modifiedFromAsset = {
        code: splittedFrom[0],
        issuer: splittedFrom[1],
        web: minimizeAddress(splittedFrom[1]),
        logo: questionLogo,
      };
    }

    if (toCustomAsset === 'XLM') {
      modifiedToAsset = XLM;
    } else {
      const splittedTo = toCustomAsset.split('-');
      modifiedToAsset = {
        code: splittedTo[0],
        issuer: splittedTo[1],
        web: minimizeAddress(splittedTo[1]),
        logo: questionLogo,
      };
    }

    includeToken.push(modifiedFromAsset, modifiedToAsset);
  } else {
    includeToken = [];
    modifiedFromAsset = null;
    modifiedToAsset = null;
  }

  function changeOtherInput(targetInput, mode) {
    return (val) => {
      const amount = val.currentTarget.value;
      const parsed = parseFloat(amount);
      if (parsed) { // eslint-disable-line
        let calculatedPrice;
        if (mode) {
          calculatedPrice = parsed * checkout.counterPrice;
        } else {
          calculatedPrice = parsed / checkout.counterPrice;
        }

        setValue(targetInput, calculatedPrice.toFixed(5));

        let found;
        let advanced = true;
        if (checkout.fromAsset.code === 'XLM') {
          found = userToken.find((item) => item.asset_type === 'native');
        } else {
          found = userToken.find(
            (item) => checkout.fromAsset.code === item.asset_code
        && checkout.fromAsset.issuer === item.asset_issuer,
          );
        }

        if (!found || found.balance <= (mode ? parsed : calculatedPrice)) {
          setSwapButtonText('Insuffiecent fund');
          advanced = false;
        } else {
          setSwapButtonText('Swap');
        }

        updateCheckout({
          fromAmount: mode ? parsed : calculatedPrice,
          showAdvanced: advanced,
        });
      } else {
        setSwapButtonText('Enter an amount');
        setValue(targetInput, null);
        updateCheckout({
          showAdvanced: false,
        });
      }
    };
  }

  useEffect(() => {
    const fromAsset = defaultTokens.find((item) => item.code === 'XLM');
    const toAsset = defaultTokens.find((item) => item.code === 'MOBI');
    cleaerCheckout();
    updateCheckout({
      fromAsset: modifiedFromAsset || fromAsset,
      toAsset: modifiedToAsset || toAsset,
    });
  }, []);

  useEffect(() => {
    if (checkout.fromAsset.issuer && checkout.toAsset.issuer) {
      setLoading(true);
      fetchCounterPrice(checkout.fromAsset, checkout.toAsset).then((res) => {
        if (res) {
          updateCheckout({
            counterPrice: res,
          });
        } else {
          history.push('/');
        }
      }).finally(() => {
        setLoading(false);
      });
    }
  }, [checkout.fromAsset, checkout.toAsset, fromCustomAsset, toCustomAsset]);

  useEffect(() => {
    changeOtherInput('toAmount', true)({ currentTarget: { value: getValues('fromAmount') } });
  }, [checkout.counterPrice]);

  return (
    <div className={styles.content}>
      <form>
        <div className="form-group">
          <label className="primary-label" htmlFor="from">From</label>
          <TxnInput
            web={checkout.fromAsset.web}
            assetCode={checkout.fromAsset.code}
            logo={checkout.fromAsset.logo}
            onClick={() => showTokenModal({
              excludeToken: checkout.toAsset,
              setToken: (fromAsset) => updateCheckout({ fromAsset }),
              includeToken,
            })}
          >
            <input
              className="form-control primary-input"
              placeholder="0.0"
              ref={register}
              name="fromAmount"
              onChange={changeOtherInput('toAmount', true)}
            />
          </TxnInput>
        </div>
        <div className="row">
          <div className="col-12">
            <img
              src={arrowDown}
              height="24px"
              width="24px"
              className="d-block mx-auto"
              alt="arrow"
            />
          </div>
        </div>
        <div className="form-group mb-0" style={{ marginTop: '-8px' }}>
          <label className="primary-label" htmlFor="to">To (estimated)</label>
          <TxnInput
            web={checkout.toAsset.web || minimizeAddress(checkout.toAsset.issuer)}
            assetCode={checkout.toAsset.code}
            logo={checkout.toAsset.logo}
            onClick={() => showTokenModal({
              excludeToken: checkout.fromAsset,
              setToken: (toAsset) => updateCheckout({ toAsset }),
              includeToken,
            })}
          >
            <input
              className="form-control primary-input"
              placeholder="0.0"
              ref={register}
              name="toAmount"
              onChange={changeOtherInput('fromAmount', false)}
            />
          </TxnInput>
          <p className={styles.info}>
            {loading && 'Fetching counter price...'}
            {!loading && (
              `1 ${checkout.toAsset.code} = ${(1 / checkout.counterPrice).toFixed(7)} ${checkout.fromAsset.code}`
            )}
          </p>
        </div>
        {userLogged && (
          <button
            type="button"
            className={classNames(styles.btn, 'button-primary-lg')}
            disabled={!checkout.showAdvanced}
            onClick={() => {
              updateCheckout({
                fromAddress: user.detail.publicKey,
                toAddress: user.detail.publicKey,
              });
              showConfirmSwap(checkout);
            }}
          >
            {swapButtonText}
          </button>
        )}

        {!userLogged && (
          <button
            type="button"
            className={classNames(styles.btn, 'button-primary-lg')}
            onClick={showConnectModal}
          >
            Connect Wallet
          </button>
        )}
      </form>
    </div>
  );
};

export default Swap;
