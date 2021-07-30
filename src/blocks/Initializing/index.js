import classNames from 'classnames';
import { useEffect, useState } from 'react';
import Loading from 'components/Loading';
import { loginTypes } from 'reducers/user';
import rabetIcon from 'assets/images/rabet.svg';
import albedoIcon from 'assets/images/albedo.svg';
import ledgerIcon from 'assets/images/ledger.svg';
import freighterIcon from 'assets/images/freighter.svg';
import loginWithAlbedo from 'walletIntegeration/logins/loginWithAlbedo';
import { closeModalAction } from 'actions/modal';
import userLogin from 'actions/user/login';
import { setUserBalance } from 'actions/userBalance';
import balanceMapper from 'helpers/balanceMapper';
import { fetchAccountTokenList } from 'api/stellar';
import loginWithLedger from 'walletIntegeration/logins/loginWithLedger';
import loginWithFreighter from 'walletIntegeration/logins/loginWithFreighter';
import loginWithRabet from 'walletIntegeration/logins/loginWithRabet';
import { useDispatch } from 'react-redux';
import styles from './styles.module.scss';

const Initializing = ({ loginMethod }) => {
  const [connecting, setConnecting] = useState(true);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  async function connectWallet() {
    setConnecting(true);
    setError(false);
    try {
      let address;
      if (loginMethod === loginTypes.ALBEDO) {
        address = await loginWithAlbedo();
      } else if (loginMethod === loginTypes.LEDGER_S) {
        address = await loginWithLedger();
      } else if (loginMethod === loginTypes.FREIGHTER) {
        address = await loginWithFreighter();
      } else if (loginMethod === loginTypes.RABET) {
        address = await loginWithRabet();
      } else {
        throw new Error('cannot handle login type');
      }

      const tokenList = await fetchAccountTokenList(address);
      userLogin(loginMethod, { address });
      dispatch(setUserBalance(tokenList.map(balanceMapper)));

      dispatch(closeModalAction());
    } catch (e) {
      console.error('error', e);
      setError(true);
    } finally {
      setConnecting(false);
    }
  }

  useEffect(() => {
    connectWallet();
  }, []);

  let wallet = '';
  let walletDesc = '';
  let walletIcon = '';
  if (loginMethod === loginTypes.ALBEDO) {
    wallet = 'Albedo';
    walletDesc = 'Easy-to-use browser extension wallet';
    walletIcon = albedoIcon;
  } else if (loginMethod === loginTypes.FREIGHTER) {
    wallet = 'Freighter';
    walletDesc = 'Easy-to-use browser extension wallet';
    walletIcon = freighterIcon;
  } else if (loginMethod === loginTypes.LEDGER_S) {
    wallet = 'Ledger';
    walletDesc = 'Easy-to-use hardware wallet';
    walletIcon = ledgerIcon;
  } else if (loginMethod === loginTypes.RABET) {
    wallet = 'Rabet';
    walletDesc = 'Easy-to-use browser extension wallet';
    walletIcon = rabetIcon;
  }

  return (
    <div>
      {connecting && (
        <div className={styles.connecting}>
          <Loading size={22} /><span>Connecting...</span>
        </div>
      )}

      {!connecting && error && (
        <div className={classNames(styles.connecting, styles.error)}>
          Error connecting. <button type="button" onClick={connectWallet}>Try again</button>
        </div>
      )}

      <div className={styles.btn}>
        <div className="d-flex flex-column text-left">
          <span className={styles.name}>{wallet}</span>
          <span className={styles.msg}>{walletDesc}</span>
        </div>
        <img src={walletIcon} width={22} alt="icon" />
      </div>
    </div>
  );
};

export default Initializing;
