import { ReactComponent as SuccessIcon } from 'assets/images/success.svg';
import { ReactComponent as FailIcon } from 'assets/images/fail.svg';
import Button from 'components/Button';
import { closeModalAction } from 'actions/modal';
import styles from './styles.module.scss';

const TransactionResponse = ({
  status, message, title, btnText, onClick, btnType, btnLink,
}) => {
  let icon = null;
  let btnContent = null;
  if (status === 'success') {
    icon = <SuccessIcon className={styles.icon} />;
    btnContent = btnText || <>View on explorer<span className="icon-arrow-right" /></>;
  } else {
    icon = <FailIcon className={styles.icon} />;
    btnContent = <>Got it</>;
  }

  return (
    <div className="text-center">
      {icon}
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.text}>{message}</p>
      {btnType === 'link' ? (
        <a href={btnLink} className={styles.btnLink} target="_blank" rel="noreferrer">
          {btnText}
        </a>
      ) : (
        <Button
          variant="primary"
          content={btnContent}
          className={styles.btn}
          onClick={() => {
            if (onClick) {
              onClick();
            } else {
              closeModalAction();
            }
          }}
        />
      )}
    </div>

  );
};

export default TransactionResponse;
