import Transport from '@ledgerhq/hw-transport-u2f';
import Str from '@ledgerhq/hw-app-str';
import store from 'src/store';
import StellarSDK from 'stellar-sdk';
import getDeleteManageBuyOfferTRX from './getDeleteManageBuyOfferTRX';
import hideModal from 'src/actions/modal/hide';
import showTxnStatus from 'src/actions/modal/transactionStatus';
import { trsStatus } from 'src/constants/enum';
import showWaitingModal from 'src/actions/modal/waiting';

const server = new StellarSDK.Server(process.env.REACT_APP_HORIZON);

export default async function deleteManageBuyOfferWithLedgerS(offer) {
  const { user } = store.getState();

  showWaitingModal({
    message: 'Waiting for signing',
  });

  try {
    const transaction = await getDeleteManageBuyOfferTRX(offer);

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
