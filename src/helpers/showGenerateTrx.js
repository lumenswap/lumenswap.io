import { openModalAction } from 'actions/modal';
import TransactionResponse from 'blocks/TransactionResponse';
import WaitingContent from 'blocks/WaitingContent';

export default async function showGenerateTrx(func, dispatch) {
  dispatch(openModalAction({
    modalProps: {
      hasClose: false,
    },
    content: <WaitingContent message="Waiting for Sign" />,
  }));

  try {
    return await func();
  } catch (e) {
    console.error(e);
    dispatch(openModalAction({
      modalProps: {},
      content: <TransactionResponse
        message="Failed to generate your transaction"
        status="failed"
        title="Failed"
      />,
    }));

    return Promise.reject(e);
  }
}
