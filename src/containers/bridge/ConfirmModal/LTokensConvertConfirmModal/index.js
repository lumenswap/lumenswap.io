import { useState } from 'react';
import CSteps from 'components/CSteps';
import SuccessDialog from 'containers/bridge/ConfirmModal/SuccessDialog';
import generatePaymentTRX from 'stellar-trx/generatePaymentTRX';
import { useDispatch } from 'react-redux';
import useUserAddress from 'hooks/useUserAddress';
import { getAssetDetails } from 'helpers/asset';
import showGenerateTrx from 'helpers/showGenerateTrx';
import showSignResponse from 'helpers/showSignResponse';
import ConfirmLTokenTransaction from './ConfirmLTokenTransaction';
import ConfirmTransactionLoading from './ConfirmTransactionLoading';
import styles from '../styles.module.scss';

const LTokensConvertCofirmModal = ({ convertInfo }) => {
  const dispatch = useDispatch();
  const userAddress = useUserAddress();
  const [currentStep, setCurrentStep] = useState(0);
  const [convertResponse, setConvertResponse] = useState(null);
  const [transactionResponseInfo, setTransactionResponseInfo] = useState(null);
  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const sendConvertRequest = () => {
    async function func() {
      return generatePaymentTRX(
        userAddress,
        '1',
        getAssetDetails({
          code: convertInfo.from_asset.name, issuer: process.env.REACT_APP_L_ISSUER,
        }),
        convertInfo.wallet.address,
        convertInfo.memo,
      );
    }

    showGenerateTrx(func, dispatch)
      .then(async (trx) => {
        const trxHash = await showSignResponse(trx, dispatch);
        setTransactionResponseInfo({ trx_hash: trxHash });
        nextStep();
      })
      .catch(console.error);
  };

  const convertSteps = [
    {
      content: <ConfirmLTokenTransaction
        convertInfo={convertInfo}
        sendConvertRequest={sendConvertRequest}
      />,
    },
    {
      content: <ConfirmTransactionLoading
        convertInfo={convertInfo}
        transactionInfo={transactionResponseInfo}
      />,
    },
    {
      content: <SuccessDialog
        responseInfo={convertResponse}
      />,
    },
  ];
  return (
    <div className={styles.container}>
      <CSteps currentStep={currentStep} steps={convertSteps} />
    </div>
  );
};

export default LTokensConvertCofirmModal;
