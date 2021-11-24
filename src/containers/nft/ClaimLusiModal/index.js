import { useDispatch, useSelector } from 'react-redux';
import { openModalAction } from 'actions/modal';
import Button from 'components/Button';
import Image from 'next/image';
import Submitting from 'components/Submitting';
import getAssetDetails from 'helpers/getAssetDetails';
import isSameAsset from 'helpers/isSameAsset';
import generateTrustlineTRX from 'stellar-trx/generateTrustlineTRX';
import showGenerateTrx from 'helpers/showGenerateTrx';
import showSignResponse from 'helpers/showSignResponse';
import TransactionResponse from 'blocks/TransactionResponse';
import { generateTransactionURL } from 'helpers/explorerURLGenerator';
import { claimLusiApi } from 'api/nft';
import { useState } from 'react';
import styles from './styles.module.scss';

function ButtonContent({ step, loading }) {
  if (step === null || loading) {
    return <Submitting loadingSize={21} />;
  }

  if (step === 'trust') {
    return 'Create trustline';
  }

  return 'Claim';
}

const handleClaim = async (lusi, lusiAsset, userAddress, step, dispatch,
  setLoading, loadRewardLusi) => {
  if (step === 'trust') {
    // eslint-disable-next-line no-inner-declarations
    function func() {
      return generateTrustlineTRX(userAddress, lusiAsset);
    }

    await showGenerateTrx(func, dispatch)
      .then((trx) => showSignResponse(trx, dispatch, () => {
        dispatch(
          openModalAction({
            modalProps: { title: `You won #${lusi.assetCode}` },
            content: <ClaimLusiModal lusi={lusi} />,
          }),
        );
      }))
      .catch(console.error);
  } else {
    setLoading(true);
    try {
      const res = await claimLusiApi(userAddress);
      dispatch(openModalAction({
        modalProps: {},
        content: <TransactionResponse
          message={res.data.hash}
          status="success"
          title="Success Transaction"
          btnText="View on Explorer"
          btnType="link"
          btnLink={generateTransactionURL(res.data.hash)}
        />,
      }));
      loadRewardLusi();
    } catch (e) {
      dispatch(openModalAction({
        modalProps: {},
        content: <TransactionResponse
          message={e.message}
          status="failed"
          title="Failed"
        />,
      }));
    }
  }
};

const ClaimLusiModal = ({ lusi, loadRewardLusi }) => {
  const userBalances = useSelector((state) => state.userBalance);
  const userAddress = useSelector((state) => state.user.detail.address);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  let step = null;
  const lusiAsset = getAssetDetails({
    code: lusi.assetCode,
    issuer: process.env.REACT_APP_LUSI_ISSUER,
  });

  let found = false;
  for (const balance of userBalances) {
    const currentAsset = getAssetDetails({
      code: balance.asset.code,
      issuer: balance.asset.issuer,
    });

    if (isSameAsset(currentAsset, lusiAsset)) {
      step = 'claim';
      found = true;
      break;
    }
  }

  if (!found) {
    step = 'trust';
  }

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      </div>
      <div className={styles.img}>
        <Image
          src={lusi.imageUrl}
          layout="fill"
        />
      </div>
      <Button
        onClick={() => handleClaim(lusi,
          lusiAsset, userAddress, step, dispatch, setLoading, loadRewardLusi)}
        htmlType="submit"
        variant="primary"
        className={styles.btn}
        disabled={step === null || loading}
      >
        <ButtonContent step={step} loading={loading} />
      </Button>
    </div>
  );
};

export default ClaimLusiModal;
