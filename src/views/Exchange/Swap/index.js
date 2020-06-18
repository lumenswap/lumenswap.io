import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import arrowDown from 'src/assets/images/arrow-down.png';
import arrowRepeat from 'src/assets/images/arrow-repeat.png';
import TxnInput from 'src/shared/components/TxnInput';
import showConnectModal from 'src/actions/modal/connectModal';
import { useSelector } from 'react-redux';
import showTokenModal from 'src/actions/modal/tokenModal';
import defaultTokens from 'src/tokens/defaultTokens';
import updateCheckout from 'src/actions/checkout/update';
import cleaerCheckout from 'src/actions/checkout/clear';
import fetchCounterPrice from 'src/helpers/fetchCounterPrice';
import { useForm } from 'react-hook-form';
import styles from './styles.less';

const Swap = () => {
  const { userLogged, checkout } = useSelector((state) => ({
    userLogged: state.user.logged,
    checkout: state.checkout,
  }));
  const [loading, setLoading] = useState(true);
  const {
    setValue, register,
  } = useForm();

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
        updateCheckout({
          fromAmount: mode ? parsed : calculatedPrice,
          showAdvanced: true,
        });
      } else {
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
      fromAsset,
      toAsset,
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
        }
      }).finally(() => {
        setLoading(false);
      });
    }
  }, [checkout.fromAsset, checkout.toAsset]);

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
            web={checkout.toAsset.web}
            assetCode={checkout.toAsset.code}
            logo={checkout.toAsset.logo}
            onClick={() => showTokenModal({
              excludeToken: checkout.fromAsset,
              setToken: (toAsset) => updateCheckout({ fromAsset: toAsset }),
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
              `1 ${checkout.fromAsset.code} = ${checkout.counterPrice.toFixed(7)} ${checkout.toAsset.code}`
            )}
            <img
              src={arrowRepeat}
              width="18px"
              height="18px"
              alt="arrow"
              className="ml-1"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                updateCheckout({
                  fromAsset: checkout.toAsset,
                  toAsset: checkout.fromAsset,
                });
              }}
            />
          </p>
        </div>
        {userLogged && (
          <button
            type="button"
            className={classNames(styles.btn, 'button-primary-lg')}
            disabled={!checkout.showAdvanced}
          >
            {checkout.showAdvanced ? 'Swap' : 'Enter an amount'}
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
