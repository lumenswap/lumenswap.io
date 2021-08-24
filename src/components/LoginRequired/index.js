import { useDispatch } from 'react-redux';
import Image from 'next/image';
import Button from 'components/Button';
import { openConnectModal } from 'actions/modal';
import styles from './styles.module.scss';

const LoginRequired = ({ text, logo }) => {
  const dispatch = useDispatch();
  return (
    <div className="row justify-content-center">
      <div className="col-auto">
        <div className={styles['connect-container']}>

          <Image width="68" height="68" src={logo} alt="icon" />

          <div className={styles['connect-text']}>
            {text}
          </div>
          <Button
            variant="secondary"
            content="Connect Wallet"
            fontWeight="500"
            className={styles['connect-btn']}
            onClick={() => {
              dispatch(openConnectModal());
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginRequired;
