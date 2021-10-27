import { useDispatch } from 'react-redux';
import { closeModalAction } from 'actions/modal';
import Button from 'components/Button';
import Image from 'next/image';
import styles from './styles.module.scss';

const CalimLusiModal = ({ lusi }) => {
  const dispatch = useDispatch();

  const handleCalim = () => {
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
        onClick={handleCalim}
        htmlType="submit"
        variant="primary"
        content="Calim"
        className={styles.btn}
      />
    </div>
  );
};

export default CalimLusiModal;
