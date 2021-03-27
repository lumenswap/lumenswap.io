import classNames from 'classnames';
import { useEffect, useState } from 'react';
import Loading from 'components/Loading';
import Ledger from 'assets/images/ledger.svg';
import styles from './styles.module.scss';

const Initializing = () => {
  const [loadingTimer, setLoadingTimer] = useState(false);
  useEffect(() => {
    setLoadingTimer(true);
    const timer = setTimeout(() => {
      setLoadingTimer(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div>
      {loadingTimer ? (
        <div className={styles.connecting}>
          <Loading size={22} /><span>Connecting...</span>
        </div>
      ) : (
        <div className={classNames(styles.connecting, styles.error)}>
          Error connecting. <button type="button">Try again</button>
        </div>
      )}
      <button type="button" className={styles.btn}>
        <div className="d-flex flex-column text-left">
          <span className={styles.name}>Ledger</span>
          <span className={styles.msg}>Easy-to-use hardware wallet</span>
        </div>
        <img src={Ledger} width={22} alt="icon" />
      </button>
    </div>
  );
};

export default Initializing;
