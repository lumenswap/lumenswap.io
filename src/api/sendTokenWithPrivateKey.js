import StellarSDK from 'stellar-sdk';
import store from 'src/store';
import getAssetDetails from 'src/helpers/getAssetDetails';
import showWaitingModal from 'src/actions/modal/waiting';
import hideModal from 'src/actions/modal/hide';
import showTxnStatus from 'src/actions/modal/transactionStatus';
import { trsStatus } from 'src/constants/enum';

const server = new StellarSDK.Server(process.env.HORIZON);

export default async function sendTokenWithPrivateKey() {
  showWaitingModal({ message: 'Sending to network' });
  try {
    const { checkout, userToken, user } = store.getState();

    let needToTrust;
    if (checkout.toAsset.issuer === 'native') {
      needToTrust = false;
    } else {
      needToTrust = !userToken.find(
        (token) => token.asset_code === checkout.toAsset.code
      && token.asset_issuer === checkout.toAsset.issuer,
      );
    }

    const account = await server.loadAccount(checkout.fromAddress);
    const fee = await server.fetchBaseFee();

    let transaction = new StellarSDK.TransactionBuilder(
      account,
      { fee, networkPassphrase: StellarSDK.Networks.PUBLIC },
    );
    if (needToTrust) {
      transaction = transaction.addOperation(
        StellarSDK.Operation.changeTrust({
          asset: getAssetDetails(checkout.toAsset),
        }),
      );
    }

    const path = [];
    if (!getAssetDetails(checkout.fromAsset).isNative()
  && !getAssetDetails(checkout.toAsset).isNative()) {
      path.push(new StellarSDK.Asset.native()); // eslint-disable-line
    }

    transaction = transaction
      .addOperation(
        StellarSDK.Operation.pathPaymentStrictSend({
          sendAsset: getAssetDetails(checkout.fromAsset),
          sendAmount: checkout.fromAmount.toFixed(7),
          destination: checkout.toAddress,
          destAsset: getAssetDetails(checkout.toAsset),
          destMin: (checkout.fromAmount * checkout.counterPrice * (1 - checkout.tolerance))
            .toFixed(7),
          path,
        }),
      )
      .setTimeout(30)
      .build();

    transaction.sign(StellarSDK.Keypair.fromSecret(user.detail.privateKey));

    const result = await server.submitTransaction(transaction);
    hideModal();
    showTxnStatus({ status: trsStatus.SUCCESS, message: result.hash, link: `https://lumenscan.io/txns/${result.hash}` });
  } catch (e) {
    hideModal();

    if (e?.response?.data?.extras?.result_codes?.operations) {
      const code = e.response.data.extras.result_codes.operations[1]
        ? e.response.data.extras.result_codes.operations[1]
        : e.response.data.extras.result_codes.operations[0];

      if (code === 'op_under_dest_min') {
        showTxnStatus({ status: trsStatus.FAIL, message: `There is some issue in your transaction. reason: ${code}` });
      } else {
        showTxnStatus({ status: trsStatus.FAIL, message: `There is some issue in your transaction. reason: ${code}` });
      }
    }
  }
}
