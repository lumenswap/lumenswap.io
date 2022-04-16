import { useEffect, useState } from 'react';
import CSteps from 'components/CSteps';
import SuccessDialog from 'containers/bridge/ConfirmModal/SuccessDialog';
import { useDispatch } from 'react-redux';
import { openModalAction } from 'actions/modal';
import { orderStates } from 'containers/bridge/orderStates';
import SendAmountLoading from './SendAmountLoading';
import ConfirmSendAmount from './ConfirmSendAmount';
import styles from '../styles.module.scss';

const ConvertConfirmModal = ({ convertInfo }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [convertResponse, setConvertResponse] = useState(null);
  const dispatch = useDispatch();
  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };
  useEffect(() => {
    if (convertInfo.state === orderStates.AWAITING_USER_PAYMENT) {
      setCurrentStep(0);
    }
  }, []);

  const sendConvertRequest = () => () => {
    nextStep();
  };
  const openPreviousModal = () => () => {
    dispatch(
      openModalAction({
        modalProps: {
          className: 'main p-0',
          hasClose: false,
        },
        content: <ConvertConfirmModal
          convertInfo={convertInfo}
        />,
      }),
    );
  };

  const convertSteps = [
    {
      content: <ConfirmSendAmount
        convertInfo={convertInfo}
        openPreviousModal={openPreviousModal}
      />,
    },
    { content: <SendAmountLoading convertInfo={convertInfo} /> },
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

export default ConvertConfirmModal;
