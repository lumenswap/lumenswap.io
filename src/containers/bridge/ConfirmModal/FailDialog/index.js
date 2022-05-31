import { useDispatch } from 'react-redux';
import Button from 'components/Button';
import { closeModalAction } from 'actions/modal';
import FailIcon from 'assets/images/bridgeFailIcon';
import FailIconDark from 'assets/images/error-dark';
import useCurrentTheme from 'hooks/useCurrentTheme';
import styles from './styles.module.scss';

const FailDialog = () => {
  const dispatch = useDispatch();
  const handleCloseModal = () => () => {
    dispatch(closeModalAction());
  };
  const currentTheme = useCurrentTheme();
  return (
    <div className="pt-1 text-center">
      {currentTheme === 'light' ? <FailIcon /> : <FailIconDark />}
      <h6 className={styles.title}>Failed</h6>
      <p className={styles.desc}>
        There is some issue in your transaction
      </p>
      <Button
        onClick={handleCloseModal()}
        variant="primary"
        className={styles['fail-btn']}
      >
        Got it
      </Button>
    </div>
  );
};

export default FailDialog;
