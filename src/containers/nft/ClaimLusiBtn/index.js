import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserRewardLusi } from 'api/AllLusiAPI';
import { openModalAction } from 'actions/modal';
import useLoggedInfo from 'hooks/useUserLoggedInfo';
import questionLogo from '../../../../public/images/question.png';
import ClaimLusiModal from '../ClaimLusiModal';

import styles from './styles.module.scss';

function ClaimLusiBtn() {
  const [rewardLusi, setRewardLusi] = useState(null);

  const userAdress = useSelector((state) => state.user.detail.address);
  const isLogged = useLoggedInfo();

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
          content: <ClaimLusiModal lusi={rewardLusi} />,
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
        <span>Claim my lusi</span>
      </div>
    </div>
  );
}

export default ClaimLusiBtn;
