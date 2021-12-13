import { openModalAction } from 'actions/modal';
import TransactionResponse from 'blocks/TransactionResponse';
import signForThem from 'walletIntegeration/signForThem';
import { generateTransactionURL } from './explorerURLGenerator';

export default async function showSignResponse(trx, dispatch, onAfterClose = () => {}) {
  try {
    const trxHash = await signForThem(trx, dispatch);
    dispatch(openModalAction({
      modalProps: { onAfterClose },
      content: <TransactionResponse
        message={trxHash}
        status="success"
        title="Success Transaction"
        btnText="View on Explorer"
        btnType="link"
        btnLink={generateTransactionURL(trxHash)}
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
