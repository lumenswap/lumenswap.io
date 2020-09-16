import StellarSDK from 'stellar-sdk';
import store from 'src/store';
import getAssetDetails from 'src/helpers/getAssetDetails';
import hideModal from 'src/actions/modal/hide';
import showTxnStatus from 'src/actions/modal/transactionStatus';
import { trsStatus } from 'src/constants/enum';
import albedo from '@albedo-link/intent';

const server = new StellarSDK.Server(process.env.REACT_APP_HORIZON);

export default async function createManageBuyOfferWithAlbedo() {
  try {
    const { checkout, userToken } = store.getState();

    const account = await server.loadAccount(checkout.fromAddress);
    const fee = await server.fetchBaseFee();

    let needToTrust;
    if (checkout.toAsset.issuer === 'native') {
      needToTrust = false;
    } else {
      needToTrust = !userToken.find(
        (token) =>
          token.asset_code === checkout.toAsset.code &&
          token.asset_issuer === checkout.toAsset.issuer
      );
    }

    let transaction = new StellarSDK.TransactionBuilder(account, {
      fee,
      networkPassphrase: StellarSDK.Networks.PUBLIC,
    });

    if (needToTrust) {
      transaction = transaction.addOperation(
        StellarSDK.Operation.changeTrust({
          asset: getAssetDetails(checkout.toAsset),
        })
      );
    }

    transaction = transaction
      .addOperation(
        StellarSDK.Operation.manageBuyOffer({
          selling: getAssetDetails(checkout.fromAsset),
          buying: getAssetDetails(checkout.toAsset),
          buyAmount: (
            checkout.fromAmount *
            checkout.counterPrice *
            (1 - checkout.tolerance)
          ).toFixed(7),
          price: {
            n: 1 * 10000000,
            d: Math.floor(
              (checkout.counterPrice * (1 - checkout.tolerance)).toFixed(7) *
                10000000
            ),
          },
          offerId: 0,
        })
      )
      .setTimeout(30)
      .build();

    const result = await albedo.tx({
      xdr: transaction.toXDR(),
      submit: true,
    });

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
