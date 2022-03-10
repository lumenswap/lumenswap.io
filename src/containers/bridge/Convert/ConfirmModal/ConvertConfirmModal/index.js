import { useState } from 'react';
import CSteps from 'components/CSteps';
import { sendConvertReq } from 'api/mockAPI/convertMockAPI';
import SuccessDialog from 'containers/bridge/Convert/ConfirmModal/SuccessDialog';
import SendAmountLoading from './SendAmountLoading';
import ConfirmSendAmount from './ConfirmSendAmount';
import styles from '../styles.module.scss';

const ConvertConfirmModal = ({ convertInfo }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [convertResponse, setConvertResponse] = useState(null);
  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const sendConvertRequest = () => () => {
    nextStep();
    sendConvertReq(convertInfo).then((res) => {
      if (res.status === 'success') {
        setConvertResponse(res);
        nextStep();
      }
    });
  };

  const convertSteps = [
    {
      content: <ConfirmSendAmount
        convertInfo={convertInfo}
        sendConvertRequest={sendConvertRequest}
      />,
    },
    { content: <SendAmountLoading convertInfo={convertInfo} /> },
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

export default ConvertConfirmModal;
