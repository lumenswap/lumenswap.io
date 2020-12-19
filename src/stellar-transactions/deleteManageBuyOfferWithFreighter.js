import StellarSDK from 'stellar-sdk';
import hideModal from 'src/actions/modal/hide';
import getDeleteManageBuyOfferTRX from './getDeleteManageBuyOfferTRX';
import showTxnStatus from 'src/actions/modal/transactionStatus';
import { trsStatus } from 'src/constants/enum';
import showWaitingModal from 'src/actions/modal/waiting';
import { signTransaction } from '@stellar/freighter-api';

const server = new StellarSDK.Server(process.env.REACT_APP_HORIZON);

export default async function deleteManageBuyOfferWithFreighter(offer) {
  showWaitingModal({
    message: 'Creating transaction',
  });

  try {
    const originalTransaction = await getDeleteManageBuyOfferTRX(offer);

    showWaitingModal({
      message: 'Waiting for signing',
    });

    const signedFromFreighter = await signTransaction(
      originalTransaction.toXDR()
    );
    const transaction = StellarSDK.TransactionBuilder.fromXDR(
      signedFromFreighter,
      process.env.REACT_APP_HORIZON
    );

    showWaitingModal({
      message: 'Sending to Network',
    });

    const result = await server.submitTransaction(transaction);
    hideModal();
    showTxnStatus({
      status: trsStatus.SUCCESS,
      message: result.hash,
      action: () => {
        global.window.open(
          `https://lumenscan.io/txns/${result.hash}`,
          '_blank'
        );
      },
    });
  } catch (e) {
    hideModal();

    if (e?.response?.data?.extras?.result_codes?.operations) {
      const code = e.response.data.extras.result_codes.operations[0];
      showTxnStatus({
        status: trsStatus.FAIL,
        message: `There is some issue in your transaction. reason: ${code}`,
      });
    } else {
      if (e.message) {
        showTxnStatus({
          status: trsStatus.FAIL,
          message: e.message,
        });
      } else {
        showTxnStatus({
          status: trsStatus.FAIL,
          message: 'There is some issue in your transaction.',
        });
      }
    }
  }
}
