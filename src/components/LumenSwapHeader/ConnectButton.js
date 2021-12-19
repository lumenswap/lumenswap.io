import useIsLogged from 'hooks/useIsLogged';
import Button from 'components/Button';
import CustomDropdown from 'components/LumenSwapHeader/Dropdown';
import { useDispatch } from 'react-redux';
import { openConnectModal } from 'actions/modal';
import styles from './styles.module.scss';

function ConnectButton() {
  const isLogged = useIsLogged();
  const dispatch = useDispatch();
  if (isLogged) {
    return <CustomDropdown height="40px" width="160px" />;
  }
  return (
    <Button
      variant="secondary"
      content="Connect Wallet"
      fontWeight={500}
      className={styles.btn}
      onClick={() => {
        dispatch(openConnectModal());
      }}
    />
  );
}

export default ConnectButton;
