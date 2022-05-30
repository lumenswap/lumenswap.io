import classNames from 'classnames';
import QrIcon from 'assets/images/qr';
import humanizeAmount from 'helpers/humanizeAmount';
import minimizeAddress from 'helpers/minimizeAddress';
import { useDispatch } from 'react-redux';
import { openModalAction } from 'actions/modal';
import capitalizeFirstLetter from 'helpers/capitalizeFirstLetter';
import { calculateFromAmount } from 'containers/bridge/calculateFromAndToAmounts';
import CustomCopyText from './CustomCopyText';
import styles from '../../styles.module.scss';
import CreateQRCodeModal from './CreateQRCodeModal';

const ConfirmSendAmount = ({ convertInfo, openPreviousModal }) => {
  const dispatch = useDispatch();
  const handleShowQRCodeModal = () => () => {
    dispatch(
      openModalAction({
        modalProps: {
          className: 'main',
          hasClose: false,
        },
        content: <CreateQRCodeModal
          openPreviousModal={openPreviousModal}
          value={convertInfo.wallet.address}
        />,
      }),
    );
  };
  return (
    <>
      <p className={styles.text}>
        Please send the specified amount to the specified address.
      </p>

      <label className="label-primary mt-4 mb-0">Amount</label>
      <div className={styles['copy-box']}>
        {humanizeAmount(calculateFromAmount(convertInfo))} {convertInfo.from_asset.name}
        <CustomCopyText content={humanizeAmount(calculateFromAmount(convertInfo))} />
      </div>

      <label className="label-primary mt-4 mb-0">Address</label>
      <div className={styles['copy-box']}>
        {minimizeAddress(convertInfo.wallet.address)}
        <div className="d-flex">
          <span onClick={handleShowQRCodeModal()} className={styles.icon}>
            <QrIcon />
          </span>

          <CustomCopyText className="ml-2" content={convertInfo.wallet.address} />
        </div>
      </div>

      <div className={classNames(styles.note, styles['note-base'])}>
        When the {capitalizeFirstLetter(convertInfo.from_asset.network)}
        {' '} network approval the transaction,
        you will automatically be redirected to the next step.
      </div>
    </>
  );
};

export default ConfirmSendAmount;
