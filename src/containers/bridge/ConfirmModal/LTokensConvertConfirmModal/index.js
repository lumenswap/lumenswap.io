import { useState } from 'react';
import CSteps from 'components/CSteps';
import SuccessDialog from 'containers/bridge/ConfirmModal/SuccessDialog';
import { confirmTransactionReq, sendLConvertReq } from 'api/mockAPI/convertMockAPI';
import ConfirmLTokenTransaction from './ConfirmLTokenTransaction';
import ConfirmTransactionLoading from './ConfirmTransactionLoading';
import styles from '../styles.module.scss';

const LTokensConvertCofirmModal = ({ convertInfo }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [convertResponse, setConvertResponse] = useState(null);
  const [transactionResponseInfo, setTransactionResponseInfo] = useState(null);
  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const sendConvertRequest = () => {
    sendLConvertReq(convertInfo).then((res) => {
      if (res.status === 'success') {
        setTransactionResponseInfo(res);
        nextStep();
        confirmTransactionReq(res.transactionID).then((response) => {
          if (response.status === 'success') {
            setConvertResponse(response);
            nextStep();
          }
        });
      }
    });
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
        convertInfo={convertInfo}
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
