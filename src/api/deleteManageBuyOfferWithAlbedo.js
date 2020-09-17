import StellarSDK from 'stellar-sdk';
import store from 'src/store';
import hideModal from 'src/actions/modal/hide';
import showTxnStatus from 'src/actions/modal/transactionStatus';
import { trsStatus } from 'src/constants/enum';
import albedo from '@albedo-link/intent';

const server = new StellarSDK.Server(process.env.REACT_APP_HORIZON);

export default async function deleteManageBuyOfferWithAlbedo(offer) {
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

    const result = await albedo.tx({
      xdr: transaction.toXDR(),
      submit: true,
    });

    hideModal();
    console.log(result);
    showTxnStatus({
      status: trsStatus.SUCCESS,
      message: result.hash,
      action: () => {
        global.window.open(
          `https://lumenscan.io/txns/${result.result.hash}`,
          '_blank'
        );
      },
    });
  } catch (error) {
    const e = {
      response: {
        data: error.ext,
      },
    };

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
