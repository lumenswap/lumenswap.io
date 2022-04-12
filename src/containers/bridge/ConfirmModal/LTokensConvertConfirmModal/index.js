import { useState } from 'react';
import CSteps from 'components/CSteps';
import FinallDialog from 'containers/bridge/ConfirmModal/FinallDialog';
import createOrderRequest from 'api/birdgeAPI/createOrder';
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
    console.log({
      from_amount: convertInfo.amount,
      from_asset: convertInfo.tokenA.name,
      user_destination: convertInfo.destination,
      by_address: convertInfo.userAddress,
    });
    createOrderRequest({
      from_amount: convertInfo.amount,
      from_asset: convertInfo.tokenA.name,
      user_destination: convertInfo.destination,
      by_address: convertInfo.userAddress,
    }).then((res) => {
      console.log(res);
    });
    // sendLConvertReq(convertInfo).then((res) => {
    //   if (res.status === 'success') {
    //     setTransactionResponseInfo(res);
    //     nextStep();
    //     confirmTransactionReq(res.transactionID).then((response) => {
    //       if (response.status === 'success') {
    //         setConvertResponse(response);
    //         nextStep();
    //       }
    //     });
    //   }
    // });
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
      content: <FinallDialog
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
