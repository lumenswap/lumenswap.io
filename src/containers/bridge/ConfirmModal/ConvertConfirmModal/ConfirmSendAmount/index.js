import classNames from 'classnames';
import Button from 'components/Button';
import QrIcon from 'assets/images/qr';
import humanizeAmount from 'helpers/humanizeAmount';
import minimizeAddress from 'helpers/minimizeAddress';
import { useDispatch } from 'react-redux';
import { openModalAction } from 'actions/modal';
import capitalizeFirstLetter from 'helpers/capitalizeFirstLetter';
import CustomCopyText from '../CustomCopyText';
import styles from '../../styles.module.scss';
import CreateQRCodeModal from '../CreateQRCodeModal';

const ConfirmSendAmount = ({ sendConvertRequest, convertInfo, openPreviousModal }) => {
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
          value={convertInfo.destination}
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
        {humanizeAmount(convertInfo.amount)} {convertInfo.tokenA.name}
        <CustomCopyText content={humanizeAmount(convertInfo.amount)} />
      </div>

      <label className="label-primary mt-4 mb-0">Address</label>
      <div className={styles['copy-box']}>
        {minimizeAddress(convertInfo.destination)}
        <div className="d-flex">
          <span onClick={handleShowQRCodeModal()} className={styles.icon}>
            <QrIcon />
          </span>

          <CustomCopyText className="ml-2" content={convertInfo.destination} />
        </div>
      </div>

      <div className={classNames(styles.note, styles['note-base'])}>
        When the {capitalizeFirstLetter(convertInfo.tokenB.network)}
        {' '} network approval the transaction,
        you will automatically be redirected to the next step.
      </div>

      <Button
        variant="primary"
        content="Confirm"
        className="mt-4"
        size="100%"
        onClick={sendConvertRequest()}
      />
    </>
  );
};

export default ConfirmSendAmount;
