import classNames from 'classnames';
import ExternalIcon from 'assets/images/external';

import capitalizeFirstLetter from 'helpers/capitalizeFirstLetter';
import { generateBridgeTransactionURL } from 'containers/bridge/MyActivities/SingleActiviyDetails/TxLinkGenerator';
import styles from '../../styles.module.scss';

const ConfirmTransactionLoading = ({ convertInfo }) => (
  <>
    <p className={styles.text}>
      Your transaction has been done.
      {' '} Please wait for confirmation by {capitalizeFirstLetter(convertInfo.to_asset.network)}.
    </p>
    <div className={classNames(styles.note, styles['note-link'])}>
      Tx hash
      <br />
      <a
        href={generateBridgeTransactionURL(convertInfo.sending_tx, convertInfo.to_asset.network)}
        target="_blank"
        rel="noreferrer"
        className="color-primary"
      >
        {convertInfo.sending_tx}
        <ExternalIcon />
      </a>
    </div>
  </>
);

export default ConfirmTransactionLoading;
