import { useEffect, useRef, useState } from 'react';
import CSteps from 'components/CSteps';
import SuccessDialog from 'containers/bridge/ConfirmModal/SuccessDialog';
import { useDispatch } from 'react-redux';
import { openModalAction } from 'actions/modal';
import { orderStates } from 'containers/bridge/orderStates';
import getSingleOrder from 'api/birdgeAPI/getSingleOrder';
import SendAmountLoading from './SendAmountLoading';
import ConfirmSendAmount from './ConfirmSendAmount';
import styles from '../styles.module.scss';

const ConvertConfirmModal = ({ convertInfo }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const dispatch = useDispatch();
  const getConvertInfoIntervalRef = useRef(null);
  const [currentConvertInfo, setCurrentConvertInfo] = useState(convertInfo);
  useEffect(() => {
    getSingleOrder(convertInfo.id).then((newConvertInfo) => {
      setCurrentConvertInfo(newConvertInfo);
    });
  }, []);
  useEffect(() => {
    getConvertInfoIntervalRef.current = setInterval(() => {
      getSingleOrder(convertInfo.id).then((newConvertInfo) => {
        setCurrentConvertInfo(newConvertInfo);
      });
    }, 5000);
    return () => {
      clearInterval(getConvertInfoIntervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (currentConvertInfo.state === orderStates.AWAITING_USER_PAYMENT) {
      setCurrentStep(0);
    }
    if (currentConvertInfo.state === orderStates.USER_PAID
      || currentConvertInfo.state === orderStates.SENDING) {
      setCurrentStep(1);
    }
    if (currentConvertInfo.state === orderStates.DONE) {
      setCurrentStep(2);
    }
  }, [currentConvertInfo]);

  const openPreviousModal = () => () => {
    dispatch(
      openModalAction({
        modalProps: {
          className: 'main p-0',
          hasClose: false,
        },
        content: <ConvertConfirmModal
          convertInfo={currentConvertInfo}
        />,
      }),
    );
  };

  const convertSteps = [
    {
      content: <ConfirmSendAmount
        convertInfo={currentConvertInfo}
        openPreviousModal={openPreviousModal}
      />,
    },
    { content: <SendAmountLoading convertInfo={currentConvertInfo} /> },
    {
      content: <SuccessDialog
        responseInfo={currentConvertInfo}
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
