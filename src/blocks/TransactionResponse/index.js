import { ReactComponent as SuccessIcon } from 'assets/images/success.svg';
import { ReactComponent as FailIcon } from 'assets/images/fail.svg';
import Button from 'components/Button';
import styles from './styles.module.scss';

const TransactionResponse = ({ status, message, onClick }) => {
  let icon = null;
  let title = null;
  let btnContent = null;
  if (status === 'success') {
    icon = <SuccessIcon className={styles.icon} />;
    title = 'Success transaction';
    btnContent = <>View on explorer<span className="icon-arrow-right" /></>;
  } else {
    icon = <FailIcon className={styles.icon} />;
    title = 'Failed';
    btnContent = <>Got it</>;
  }

  return (
    <div className="text-center">
      {icon}
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.text}>{message}</p>
      <Button
        variant="primary"
        content={btnContent}
        className={styles.btn}
        onClick={onClick}
      />
    </div>

  );
};

export default TransactionResponse;
