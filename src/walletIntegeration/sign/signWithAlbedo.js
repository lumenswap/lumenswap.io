import albedo from '@albedo-link/intent';
import { openModalAction } from 'actions/modal';
import WaitingContent from 'blocks/WaitingContent';
import extractErrorText from 'helpers/extractErrorText';
import StellarSDK from 'stellar-sdk';

const server = new StellarSDK.Server(process.env.REACT_APP_HORIZON);

export default async function signWithAlbedo(trx, dispatch) {
  try {
    const signedXDR = await albedo.tx({
      xdr: trx.toXDR(),
    });

    const transaction = StellarSDK.TransactionBuilder.fromXDR(
      signedXDR.signed_envelope_xdr,
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
