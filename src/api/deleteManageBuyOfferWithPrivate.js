import StellarSDK from 'stellar-sdk';
import store from 'src/store';
import showWaitingModal from 'src/actions/modal/waiting';
import hideModal from 'src/actions/modal/hide';
import showTxnStatus from 'src/actions/modal/transactionStatus';
import { trsStatus } from 'src/constants/enum';

const server = new StellarSDK.Server(process.env.REACT_APP_HORIZON);

export default async function deleteManageBuyOfferWithPrivate(offer) {
  showWaitingModal({ message: 'Sending to network' });
  try {
    const { user } = store.getState();

    const account = await server.loadAccount(user.detail.publicKey);
    const fee = await server.fetchBaseFee();

    const transaction = new StellarSDK.TransactionBuilder(account, {
      fee,
      networkPassphrase: StellarSDK.Networks.PUBLIC,
    })
      .addOperation(
        StellarSDK.Operation.manageBuyOffer({
          selling:
            offer.selling.asset_type === 'native'
              ? new StellarSDK.Asset.native() // eslint-disable-line
              : new StellarSDK.Asset(
                  offer.selling.asset_code,
                  offer.selling.asset_issuer
                ),
          buying:
            offer.buying.asset_type === 'native'
              ? new StellarSDK.Asset.native() // eslint-disable-line
              : new StellarSDK.Asset(
                  offer.buying.asset_code,
                  offer.buying.asset_issuer
                ),
          buyAmount: '0',
          price: offer.price_r,
          offerId: offer.id,
        })
      )
      .setTimeout(30)
      .build();

    transaction.sign(StellarSDK.Keypair.fromSecret(user.detail.privateKey));

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
      showTxnStatus({
        status: trsStatus.FAIL,
        message: 'There is some issue in your transaction.',
      });
    }
  }
}
