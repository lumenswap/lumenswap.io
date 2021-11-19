import StellarSDK from 'stellar-sdk';
import Transport from '@ledgerhq/hw-transport-webusb';
import Str from '@ledgerhq/hw-app-str';
import extractErrorText from 'helpers/extractErrorText';
import WaitingContent from 'blocks/WaitingContent';
import { openModalAction } from 'actions/modal';

const server = new StellarSDK.Server(process.env.REACT_APP_HORIZON);

export default async function signWithLedger(trx, publicKey, dispatch) {
  try {
    const transport = await Transport.create();
    const str = new Str(transport);
    const signatureFromLedger = await str.signTransaction(
      "44'/148'/0'",
      trx.signatureBase(),
    );

    const keyPair = StellarSDK.Keypair.fromPublicKey(publicKey);
    const hint = keyPair.signatureHint();
    const decorated = new StellarSDK.xdr.DecoratedSignature({
      hint,
      signature: signatureFromLedger.signature,
    });
    trx.signatures.push(decorated);

    dispatch(openModalAction({
      modalProps: {
        hasClose: false,
      },
      content: <WaitingContent message="Sending to network" />,
    }));

    const submittedTrxResult = await server.submitTransaction(trx);
    return submittedTrxResult.hash;
  } catch (error) {
    throw new Error(extractErrorText(error));
  }
}
