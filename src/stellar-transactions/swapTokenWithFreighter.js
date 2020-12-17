import store from 'src/store';
import StellarSDK from 'stellar-sdk';
import getSwapTRX from './getSwapTRX';
import hideModal from 'src/actions/modal/hide';
import showTxnStatus from 'src/actions/modal/transactionStatus';
import reportSuccessfulSwap from 'src/api/metrics/reportSuccessfulSwap';
import { trsStatus } from 'src/constants/enum';
import createManageBuyOfferMaker from 'src/api/createMangeBuyOfferMaker';
import reportFailureSwap from 'src/api/metrics/reportFailureSwap';
import showWaitingModal from 'src/actions/modal/waiting';
import { signTransaction } from '@stellar/freighter-api';

const server = new StellarSDK.Server(process.env.REACT_APP_HORIZON);

export default async function swapTokenWithFreighter() {
  const { checkout } = store.getState();

  try {
    const stripTransaction = await getSwapTRX();
    const signedFromFreighter = await signTransaction(stripTransaction.toXDR());
    const transaction = StellarSDK.TransactionBuilder.fromXDR(
      signedFromFreighter,
      process.env.REACT_APP_HORIZON
    );

    const result = await server.submitTransaction(transaction);
    hideModal();
    reportSuccessfulSwap();
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
    reportFailureSwap();

    if (e?.response?.data?.extras?.result_codes?.operations) {
      const code = e.response.data.extras.result_codes.operations[1]
        ? e.response.data.extras.result_codes.operations[1]
        : e.response.data.extras.result_codes.operations[0];

      if (code === 'op_under_dest_min') {
        showTxnStatus({
          status: trsStatus.WARNING,
          message:
            'Your order is too large to be processed by the network. Do you want to register it as an active order on the network?',
          action: () => {
            createManageBuyOfferMaker();
          },
        });
      } else if (code === 'op_underfunded') {
        showTxnStatus({
          status: trsStatus.FAIL,
          message: `You have not enough funds to send and still satisfy "${checkout.fromAsset.code}" selling liabilities, Note that if sending XLM then the you must additionally maintain its minimum XLM reserve.`,
        });
      } else {
        showTxnStatus({
          status: trsStatus.FAIL,
          message: `There is some issue in your transaction. reason: ${code}`,
        });
      }
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
