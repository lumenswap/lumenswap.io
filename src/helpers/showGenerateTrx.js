import { openModalAction } from 'actions/modal';
import TransactionResponse from 'blocks/TransactionResponse';
import WaitingContent from 'blocks/WaitingContent';

export default async function showGenerateTrx(func) {
  openModalAction({
    modalProps: {
      hasClose: false,
    },
    content: <WaitingContent message="Waiting for Sign" />,
  });

  try {
    return await func();
  } catch (e) {
    console.error(e);
    openModalAction({
      modalProps: {},
      content: <TransactionResponse
        message="Failed to generate your swap transaction"
        status="failed"
        title="Failed"
      />,
    });

    return Promise.reject(e);
  }
}
