import QRCode from 'qrcode';
import Button from 'components/Button';
import { useEffect, useState } from 'react';
import styles from './styles.module.scss';

function CreateQRCodeModal({ value, openPreviousModal }) {
  const [qrCodeSrc, setQrCodeSrc] = useState(null);

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
        onClick={openPreviousModal()}
      />
    </div>
  );
}

export default CreateQRCodeModal;
