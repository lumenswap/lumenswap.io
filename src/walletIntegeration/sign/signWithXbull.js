import StellarSDK from 'stellar-sdk';
import extractErrorText from 'helpers/extractErrorText';
import { openModalAction } from 'actions/modal';
import WaitingContent from 'blocks/WaitingContent';

const server = new StellarSDK.Server(process.env.REACT_APP_HORIZON);

export default async function signWithXbull(trx, dispatch) {
  try {
    const signedTrx = await global.xBullSDK.signXDR(trx);
    const transaction = StellarSDK.TransactionBuilder.fromXDR(
      signedTrx.xdr,
      process.env.REACT_APP_HORIZON,
    );

    dispatch(openModalAction({
      modalProps: {
        hasClose: false,
      },
      content: <WaitingContent message="Sending to network" />,
    }));

    const result = await server.submitTransaction(transaction);
    return result.hash;
  } catch (error) {
    throw new Error(extractErrorText(error));
  }
}
