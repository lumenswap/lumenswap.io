import QRCode from 'qrcode';
import { useDispatch } from 'react-redux';
import { openModalAction } from 'actions/modal';
import Button from 'components/Button';
import { useEffect, useState } from 'react';
import ConvertConfirmModal from '..';
import styles from './styles.module.scss';

function CreateQRCodeModal({ value, convertInfo, sendConvertRequest }) {
  const dispatch = useDispatch();
  const [qrCodeSrc, setQrCodeSrc] = useState(null);
  const handleCloseModal = () => () => {
    dispatch(
      openModalAction({
        modalProps: {
          className: 'main',
          hasClose: false,
        },
        content: <ConvertConfirmModal
          convertInfo={convertInfo}
          sendConvertRequest={sendConvertRequest}
        />,
      }),
    );
  };

  useEffect(() => {
    QRCode.toDataURL(value, { version: 8 })
      .then((url) => {
        setQrCodeSrc(url);
      })
      .catch((err) => {
      });
  }, []);
  return (
    <div className={styles.main}>
      <img width={250} height={250} src={qrCodeSrc} />

      <Button
        variant="primary"
        content="Continue"
        className="mt-4"
        size="100%"
        onClick={handleCloseModal()}
      />
    </div>
  );
}

export default CreateQRCodeModal;
