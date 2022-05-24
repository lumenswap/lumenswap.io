import { useEffect, useRef, useState } from 'react';
import CSteps from 'components/CSteps';
import SuccessDialog from 'containers/bridge/ConfirmModal/SuccessDialog';
import generatePaymentTRX from 'stellar-trx/generatePaymentTRX';
import { useDispatch } from 'react-redux';
import useUserAddress from 'hooks/useUserAddress';
import { getAssetDetails } from 'helpers/asset';
import { openModalAction } from 'actions/modal';
import { orderStates } from 'containers/bridge/orderStates';
import getSingleOrder from 'api/birdgeAPI/getSingleOrder';
import { calculateFromAmount } from 'containers/bridge/calculateFromAndToAmounts';
import TransactionResponse from 'blocks/TransactionResponse';
import signForThem from 'walletIntegeration/signForThem';
import ConfirmLTokenTransaction from './ConfirmLTokenTransaction';
import ConfirmTransactionLoading from './ConfirmTransactionLoading';
import styles from '../styles.module.scss';

const LTokensConvertCofirmModal = ({ convertInfo, defaultSignLoading = false }) => {
  const dispatch = useDispatch();
  const [currentConvertInfo, setCurrentConvertInfo] = useState(convertInfo);
  const getConvertInfoIntervalRef = useRef(null);
  const userAddress = useUserAddress();
  const [signLoading, setSignLoading] = useState(defaultSignLoading);
  const [currentStep, setCurrentStep] = useState(0);
  useEffect(() => {
    getSingleOrder(convertInfo.id).then((newConvertInfo) => {
      setCurrentConvertInfo(newConvertInfo);
    }).catch((err) => console.error(err));
  }, []);
  useEffect(() => {
    getConvertInfoIntervalRef.current = setInterval(() => {
      getSingleOrder(currentConvertInfo.id).then((newConvertInfo) => {
        setCurrentConvertInfo(newConvertInfo);
      }).catch((err) => console.error(err));
    }, 5000);
    return () => { clearInterval(getConvertInfoIntervalRef.current); };
  }, []);

  useEffect(() => {
    if (currentConvertInfo.state === orderStates.AWAITING_USER_PAYMENT) {
      setCurrentStep(0);
    }
    if (currentConvertInfo.state === orderStates.USER_PAID
    || currentConvertInfo.state === orderStates.PRE_SENDING) {
      setSignLoading(true);
    }
    if (currentConvertInfo.state === orderStates.SENDING) {
      setCurrentStep(1);
    }
    if (currentConvertInfo.state === orderStates.DONE) {
      setCurrentStep(2);
    }
  }, [currentConvertInfo]);

  const sendConvertRequest = async () => {
    try {
      setSignLoading(true);
      const trx = await generatePaymentTRX(
        userAddress,
        calculateFromAmount(currentConvertInfo),
        getAssetDetails({
          code: currentConvertInfo.from_asset.name, issuer: process.env.REACT_APP_L_ISSUER,
        }),
        currentConvertInfo.wallet.address,
        currentConvertInfo.memo,
      );

      await signForThem(trx, () => {});
    } catch (e) {
      console.error(e);
      setSignLoading(false);
      dispatch(openModalAction({
        modalProps: {},
        content: <TransactionResponse
          message={e.message}
          status="failed"
          title="Failed"
        />,
      }));
    }
  };

  const convertSteps = [
    {
      content: <ConfirmLTokenTransaction
        convertInfo={currentConvertInfo}
        signLoading={signLoading}
        sendConvertRequest={sendConvertRequest}
      />,
    },
    {
      content: <ConfirmTransactionLoading
        convertInfo={currentConvertInfo}
      />,
    },
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

export default LTokensConvertCofirmModal;
