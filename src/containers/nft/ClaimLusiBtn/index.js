import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { openModalAction } from 'actions/modal';
import useIsLogged from 'hooks/useIsLogged';
import { checkLusiDropped } from 'api/nft';
import ClaimLusiModal from '../ClaimLusiModal';

import styles from './styles.module.scss';

function loadRewardLusi(userAddress, setRewardLusi) {
  checkLusiDropped(userAddress).then((res) => {
    setRewardLusi(res.data.lusi);
  }).catch(() => {
    setRewardLusi(null);
  });
}

function ClaimLusiBtn() {
  const [rewardLusi, setRewardLusi] = useState(null);
  const userAddress = useSelector((state) => state.user.detail.address);
  const isLogged = useIsLogged();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLogged) {
      loadRewardLusi(userAddress, setRewardLusi);
    }
  }, [isLogged]);

  const handleOpenModal = () => {
    if (rewardLusi) {
      dispatch(
        openModalAction({
          modalProps: { title: `You won #${rewardLusi.assetCode}` },
          content: <ClaimLusiModal
            lusi={rewardLusi}
            loadRewardLusi={() => loadRewardLusi(userAddress, setRewardLusi)}
          />,
        }),
      );
    }
  };

  if (!isLogged || !rewardLusi) {
    return null;
  }

  return (
    <div onClick={handleOpenModal} className={styles.main}>
      <div className={styles.items}>
        <div className={styles.logo}>
          <Image src={rewardLusi.imageUrl} width={28} height={28} />
        </div>
        <span>Claim my lusi</span>
      </div>
    </div>
  );
}

export default ClaimLusiBtn;
