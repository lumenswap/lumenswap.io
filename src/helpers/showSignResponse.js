import { openModalAction } from 'actions/modal';
import TransactionResponse from 'blocks/TransactionResponse';
import signForThem from 'walletIntegeration/signForThem';

export default async function showSignResponse(trx, dispatch) {
  try {
    const trxHash = await signForThem(trx);
    dispatch(openModalAction({
      modalProps: {},
      content: <TransactionResponse
        message={trxHash}
        status="success"
        title="Success Transaction"
        btnText="View on Explorer"
        btnType="link"
        btnLink={`${process.env.REACT_APP_LUMENSCAN_URL}/txns/${trxHash}`}
      />,
    }));
  } catch (e) {
    console.error(e);
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
