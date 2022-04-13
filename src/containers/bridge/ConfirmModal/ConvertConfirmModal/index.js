import { useState } from 'react';
import CSteps from 'components/CSteps';
import createOrderRequest from 'api/birdgeAPI/createOrder';
import FinallDialog from 'containers/bridge/ConfirmModal/FinallDialog';
import { useDispatch } from 'react-redux';
import { openModalAction } from 'actions/modal';
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

  const sendConvertRequest = () => () => {
    nextStep();
    createOrderRequest({
      from_amount: convertInfo.amount,
      from_asset: convertInfo.tokenA.name,
      user_destination: convertInfo.destination,
      by_address: convertInfo.userAddress,
    }).then((res) => {
      console.log(res);
      setConvertResponse(res);
      nextStep();
    });
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
        sendConvertRequest={sendConvertRequest}
        openPreviousModal={openPreviousModal}
      />,
    },
    { content: <SendAmountLoading convertInfo={convertInfo} /> },
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

export default ConvertConfirmModal;
