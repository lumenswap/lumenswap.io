import React, { useEffect } from 'react';
import classNames from 'classnames';
import arrowDown from 'src/assets/images/arrow-down.png';
import arrowRepeat from 'src/assets/images/arrow-repeat.png';
import TxnInput from 'src/shared/components/TxnInput';
import showConnectModal from 'src/actions/modal/connectModal';
import { useSelector } from 'react-redux';
import showTokenModal from 'src/actions/modal/tokenModal';
import defaultTokens from 'src/constants/defaultTokens';
import updateCheckout from 'src/actions/checkout/update';
import styles from './styles.less';

const Swap = () => {
  const { userLogged, checkout } = useSelector((state) => ({
    logged: state.user.logged,
    checkout: state.checkout,
  }));

  useEffect(() => {
    updateCheckout({
      fromAsset: defaultTokens.find((item) => item.code === 'XLM'),
      toAsset: defaultTokens.find((item) => item.code === 'MOBI'),
    });
  }, []);

  return (
    <div className={styles.content}>
      <form>
        <div className="form-group">
          <label className="primary-label" htmlFor="from">From</label>
          <TxnInput
            web={checkout.fromAsset.web}
            assetCode={checkout.fromAsset.code}
            logo={checkout.fromAsset.logo}
            onClick={() => showTokenModal({ excludeToken: checkout.toAsset })}
          >
            <input
              type="number"
              className="form-control primary-input"
              placeholder="0.0"
              id="from"
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
            onClick={() => showTokenModal({ excludeToken: checkout.fromAsset })}
          >
            <input
              type="number"
              className="form-control primary-input"
              placeholder="0.0"
              id="to"
            />
          </TxnInput>
          <p className={styles.info}>1 BTC = 12 ETH
            <img
              src={arrowRepeat}
              width="18px"
              height="18px"
              alt="arrow"
              className="ml-1"
            />
          </p>
        </div>
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
