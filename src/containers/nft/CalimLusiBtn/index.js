import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserRewardLusi } from 'api/AllLusiAPI';
import { openModalAction } from 'actions/modal';
import questionLogo from '../../../../public/images/question.png';
import CalimLusiModal from '../CalimLusiModal';

import styles from './styles.module.scss';

function CalimLusiBtn() {
  const [rewardLusi, setRewardLusi] = useState(null);

  const userAdress = useSelector((state) => state.user.detail.address);
  const isLogged = useSelector((state) => state.user.logged);

  useEffect(() => {
    if (isLogged) {
      fetchUserRewardLusi(userAdress).then((lusi) => setRewardLusi(lusi));
    }
  }, [isLogged]);

  const dispatch = useDispatch();

  const handleOpenModal = () => {
    if (rewardLusi) {
      dispatch(
        openModalAction({
          modalProps: { title: `You won #${rewardLusi.name}` },
          content: <CalimLusiModal lusi={rewardLusi} />,
        }),
      );
    }
  };
  return (
    <div onClick={handleOpenModal} className={styles.main}>
      <div className={styles.items}>
        <div className={styles.logo}>
          <Image src={rewardLusi?.img ?? questionLogo} width={28} height={28} />
        </div>
        <span>Calim my lusi</span>
      </div>
    </div>
  );
}

export default CalimLusiBtn;
