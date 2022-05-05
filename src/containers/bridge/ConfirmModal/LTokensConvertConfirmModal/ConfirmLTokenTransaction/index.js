import classNames from 'classnames';
import Button from 'components/Button';
import Loading from 'components/Loading';
import humanizeAmount from 'helpers/humanizeAmount';
import capitalizeFirstLetter from 'helpers/capitalizeFirstLetter';
import { calculateFromAmount } from 'containers/bridge/calculateFromAndToAmounts';
import styles from '../../styles.module.scss';

const ConfirmLTokenTransaction = ({ sendConvertRequest, convertInfo, signLoading }) => {
  const handleSign = () => () => {
    sendConvertRequest();
  };

  if (signLoading) {
    return (
      <>
        <p className={styles.text}>
          Please wait for the transaction to be confirmed by
          {' '} {capitalizeFirstLetter(convertInfo.from_asset.network)} Network
        </p>

        <div className={classNames(styles.loading, styles['loading-two'])}>
          <Loading size={40} />
        </div>
      </>
    );
  }

  return (
    <>
      <p className={styles.text}>
        You must sign here to approve the withdrawal of {
        humanizeAmount(calculateFromAmount(convertInfo))
}
        {' '} ‌{convertInfo.from_asset.name} from your wallet.
      </p>

      <Button
        variant="primary"
        content="Sign"
        size="100%"
        className="mt-5"
        onClick={handleSign()}
      />
    </>
  );
};

export default ConfirmLTokenTransaction;
