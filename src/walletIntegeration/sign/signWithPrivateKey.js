import StellarSDK from 'stellar-sdk';
import extractErrorText from 'helpers/extractErrorText';
import { openModalAction } from 'actions/modal';
import WaitingContent from 'blocks/WaitingContent';

const server = new StellarSDK.Server(process.env.REACT_APP_HORIZON);

export default async function signWithPrivateKey(trx, privateKey, dispatch) {
  try {
    trx.sign(StellarSDK.Keypair.fromSecret(privateKey));

    dispatch(openModalAction({
      modalProps: {
        hasClose: false,
      },
      content: <WaitingContent message="Sending to network" />,
    }));

    const result = await server.submitTransaction(trx);
    return result.hash;
  } catch (error) {
    throw new Error(extractErrorText(error));
  }
}
