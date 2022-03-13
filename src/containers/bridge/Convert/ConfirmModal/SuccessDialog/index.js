import TickIcon from 'assets/images/tick';
import AngleRightIcon from 'assets/images/angleRight';
import Button from 'components/Button';
import { useRouter } from 'next/router';
import urlMaker from 'helpers/urlMaker';
import { useDispatch } from 'react-redux';
import { closeModalAction } from 'actions/modal';
import capitalizeFirstLetter from 'helpers/capitalizeFirstLetter';
import styles from './styles.module.scss';

const SuccessDialog = ({ responseInfo, convertInfo }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const handleMoreDetailsPage = () => () => {
    router.push(urlMaker.bridge.activity.detail(responseInfo.orderID));
    dispatch(closeModalAction());
  };
  return (
    <div className="pt-1 text-center">
      <TickIcon />
      <h6 className={styles.title}>Successful</h6>
      <p className={styles.desc}>
        Your {convertInfo.tokenA.name} conversion operation from
        <br />
        <span className="mx-1">{capitalizeFirstLetter(convertInfo.tokenA.network)}</span>
        {'->'}
        <span className="mx-1">{capitalizeFirstLetter(convertInfo.tokenB.network)}</span>
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
    </div>
  );
};

export default SuccessDialog;
