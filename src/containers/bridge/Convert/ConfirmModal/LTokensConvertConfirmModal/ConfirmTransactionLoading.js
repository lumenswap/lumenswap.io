import classNames from 'classnames';
import ExternalIcon from 'assets/images/external';

import styles from '../styles.module.scss';

const ConfirmTransactionLoading = ({ convertInfo, transactionInfo }) => (
  <>
    <p className={styles.text}>
      Your transaction has been done.
      {' '} Please wait for confirmation by {convertInfo.selectedTokens.tokenB.network}.
    </p>
    <div className={classNames(styles.note, styles['note-link'])}>
      Tx hash
      <br />
      <a
        href="/"
        target="_blank"
        rel="noreferrer"
        className="color-primary"
      >
        {transactionInfo.tx_hash}
        <ExternalIcon />
      </a>
    </div>
  </>
);

export default ConfirmTransactionLoading;
