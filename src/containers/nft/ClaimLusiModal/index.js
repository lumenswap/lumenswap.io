import { useDispatch } from 'react-redux';
import { closeModalAction } from 'actions/modal';
import Button from 'components/Button';
import Image from 'next/image';
import styles from './styles.module.scss';

const ClaimLusiModal = ({ lusi }) => {
  const dispatch = useDispatch();

  const handleClaim = () => {
    dispatch(closeModalAction());
  };

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      </div>
      <div className={styles.img}>
        <Image
          src={lusi.img}
          layout="fill"
        />
      </div>
      <Button
        onClick={handleClaim}
        htmlType="submit"
        variant="primary"
        content="Claim"
        className={styles.btn}
      />
    </div>
  );
};

export default ClaimLusiModal;
