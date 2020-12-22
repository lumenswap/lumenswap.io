import Transport from '@ledgerhq/hw-transport-u2f';
import Str from '@ledgerhq/hw-app-str';
import store from 'src/store';
import StellarSDK from 'stellar-sdk';
import getSendTRX from './getSendTRX';
import hideModal from 'src/actions/modal/hide';
import showTxnStatus from 'src/actions/modal/transactionStatus';
import reportSuccessfulSwap from 'src/api/metrics/reportSuccessfulSwap';
import { trsStatus } from 'src/constants/enum';
import createManageBuyOfferMaker from 'src/api/createMangeBuyOfferMaker';
import reportFailureSwap from 'src/api/metrics/reportFailureSwap';
import showWaitingModal from 'src/actions/modal/waiting';

const server = new StellarSDK.Server(process.env.REACT_APP_HORIZON);

export default async function sendTokenWithLedgerS() {
  const { checkout, user } = store.getState();

  showWaitingModal({
    message: 'Waiting for signing',
  });

  try {
    const transaction = await getSendTRX(true);

    const transport = await Transport.create();
    const str = new Str(transport);
    const signatureFromLedger = await str.signTransaction(
      "44'/148'/0'",
      transaction.signatureBase()
    );

    const keyPair = StellarSDK.Keypair.fromPublicKey(user.detail.publicKey);
    const hint = keyPair.signatureHint();
    const decorated = new StellarSDK.xdr.DecoratedSignature({
      hint: hint,
      signature: signatureFromLedger.signature,
    });
    transaction.signatures.push(decorated);

    showWaitingModal({
      message: 'Sending to Network',
    });

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
