import { useEffect, useState } from 'react';
import { ReactComponent as SuccessIcon } from 'assets/images/success.svg';
import { ReactComponent as FailIcon } from 'assets/images/fail.svg';
import Button from 'components/Button';
import styles from './styles.module.scss';

const TransactionResponse = ({ status, message }) => {
  const [data, setData] = useState({
    icon: '', title: '', msg: message, btnContent: '', action: () => { console.warn('action'); },
  });

  useEffect(() => {
    if (status === 'success') {
      setData({
        ...data,
        icon: <SuccessIcon className={styles.icon} />,
        title: 'Success transaction',
        btnContent: <>View on explorer<span className="icon-arrow-right" /></>,
      });
    } else {
      setData({
        ...data,
        icon: <FailIcon className={styles.icon} />,
        title: 'Failed',
        btnContent: <>Got it</>,
      });
    }
  }, [status]);

  return (
    <div className="text-center">
      {data.icon}
      <h2 className={styles.title}>{data.title}</h2>
      <p className={styles.text}>{data.msg}</p>
      <Button
        variant="primary"
        content={data.btnContent}
        className={styles.btn}
        onClick={data.action}
      />
    </div>

  );
};

export default TransactionResponse;
