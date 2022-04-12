import TickIcon from 'assets/images/tick';
import FailIcon from 'assets/images/bridgeFailIcon';
import AngleRightIcon from 'assets/images/angleRight';
import Button from 'components/Button';
import { useRouter } from 'next/router';
import urlMaker from 'helpers/urlMaker';
import { useDispatch } from 'react-redux';
import { closeModalAction } from 'actions/modal';
import capitalizeFirstLetter from 'helpers/capitalizeFirstLetter';
import styles from './styles.module.scss';

const DialogContainer = ({ children }) => (
  <div className="pt-1 text-center">
    {children}
  </div>
);

const FinallDialog = ({ responseInfo }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const handleMoreDetailsPage = () => () => {
    router.push(urlMaker.bridge.activity.detail(responseInfo.id));
    dispatch(closeModalAction());
  };
  const handleCloseModal = () => () => {
    dispatch(closeModalAction());
  };

  if (responseInfo.state === 'awaiting_user_payment' || responseInfo.state === 'user_paid') {
    return (
      <DialogContainer>
        <TickIcon />
        <h6 className={styles.title}>Successful</h6>
        <p className={styles.desc}>
          Your {responseInfo.from_asset.name} conversion operation from
          <br />
          <span className="mx-1">{capitalizeFirstLetter(responseInfo.from_asset.network)}</span>
          {'->'}
          <span className="mx-1">{capitalizeFirstLetter(responseInfo.to_asset.network)}</span>
          was successful.
        </p>
        <Button
          onClick={handleMoreDetailsPage()}
          variant="primary"
          className={styles.btn}
        >
          More details
          <span className="ml-2">
            <AngleRightIcon />
          </span>
        </Button>
      </DialogContainer>
    );
  }
  return (
    <DialogContainer>
      <FailIcon />
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
    </DialogContainer>
  );
};

export default FinallDialog;
