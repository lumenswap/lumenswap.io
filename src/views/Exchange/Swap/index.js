import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import arrowDown from 'src/assets/images/arrow-down.png';
import TxnInput from 'src/shared/components/TxnInput';
import showConnectModal from 'src/actions/modal/connectModal';
import { useSelector } from 'react-redux';
import showTokenModal from 'src/actions/modal/tokenModal';
import defaultTokens from 'src/tokens/defaultTokens';
import updateCheckout from 'src/actions/checkout/update';
import clearCheckoout from 'src/actions/checkout/clear';
import fetchCounterPrice from 'src/helpers/fetchCounterPrice';
import { useParams } from 'react-router-dom';
import minimizeAddress from 'src/helpers/minimizeAddress';
import history from 'src/history';
import XLM from 'src/tokens/XLM';
import questionLogo from 'src/assets/images/question.png';
import showConfirmSwap from 'src/actions/modal/confirmSwap';
import NumberOnly from 'src/shared/components/NumberOnly';
import reportSwapClick from 'src/api/metrics/reportSwapClick';
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
  const { fromCustomAsset, toCustomAsset } = useParams();
  const [swapButtonText, setSwapButtonText] = useState('Enter an amount');
  const [isButtonDisable, setButtonDisable] = useState(false);
  const [inputFromAmount, setInputFromAmount] = useState('');
  const [inputToAmount, setInputToAmount] = useState('');

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

  function changeOtherInput(setterVal, mode) {
    return (val) => {
      if (val) {
        let calculatedPrice;
        if (mode) {
          calculatedPrice = val * checkout.counterPrice;
        } else {
          calculatedPrice = val / checkout.counterPrice;
        }

        setterVal(calculatedPrice.toFixed(7));

        let found;
        if (checkout.fromAsset.code === 'XLM') {
          found = userToken.find((item) => item.asset_type === 'native');
        } else {
          found = userToken.find(
            (item) => checkout.fromAsset.code === item.asset_code
        && checkout.fromAsset.issuer === item.asset_issuer,
          );
        }

        if (!found || found.balance <= (mode ? val : calculatedPrice)) {
          setSwapButtonText(`Insuffiecent ${checkout.fromAsset.code} balance`);
          setButtonDisable(true);
        } else {
          setButtonDisable(false);
          setSwapButtonText('Swap');
        }

        updateCheckout({
          fromAmount: mode ? val : calculatedPrice,
        });
      } else {
        if (mode) {
          updateCheckout({
            fromAmount: '',
          });
        }
        setButtonDisable(true);
        setSwapButtonText('Enter an amount');
        setterVal('');
      }
    };
  }

  useEffect(() => {
    const fromAsset = defaultTokens.find((item) => item.code === 'XLM');
    const toAsset = defaultTokens.find((item) => item.code === 'MOBI');
    clearCheckoout();
    updateCheckout({
      fromAsset: modifiedFromAsset || fromAsset,
      toAsset: modifiedToAsset || toAsset,
    });

    return () => {
      clearCheckoout();
    };
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
    changeOtherInput(setInputToAmount, true)(checkout.fromAmount);
  }, [checkout.counterPrice, JSON.stringify(userToken)]);

  function setToken(field) {
    return (token, swapMode) => {
      if (swapMode) {
        updateCheckout({
          fromAsset: checkout.toAsset,
          toAsset: checkout.fromAsset,
        });
      } else {
        updateCheckout({
          [field]: token,
        });
      }
    };
  }

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
              setToken: setToken('fromAsset'),
              includeToken,
            })}
          >
            <NumberOnly
              onChange={changeOtherInput(setInputToAmount, true)}
              initValue={inputFromAmount}
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
              style={{ cursor: 'pointer' }}
              onClick={() => {
                updateCheckout({
                  fromAsset: checkout.toAsset,
                  toAsset: checkout.fromAsset,
                });
              }}
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
              setToken: setToken('toAsset'),
              includeToken,
            })}
          >
            <NumberOnly
              onChange={changeOtherInput(setInputFromAmount, false)}
              initValue={inputToAmount}
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
            disabled={isButtonDisable}
            onClick={() => {
              updateCheckout({
                fromAddress: user.detail.publicKey,
                toAddress: user.detail.publicKey,
              });
              reportSwapClick();
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
