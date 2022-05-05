import CExternalLink from 'components/CExternalLink';
import {
  generateBTCTransactionURL, generateETHTransactionURL,
  generateSolanaTransactionURL, generateTransactionURL,
} from 'helpers/explorerURLGenerator';
import minimizeAddress from 'helpers/minimizeAddress';

const transactionNames = {
  to_asset: 'sending_tx',
  from_asset: 'receiving_tx',
};

export function generateBridgeTransactionURL(convertInfo, selectedAsset) {
  if (convertInfo[selectedAsset].network === 'stellar') {
    return generateTransactionURL(convertInfo[transactionNames[selectedAsset]]);
  }
  if (convertInfo[selectedAsset].network === 'bitcoin') {
    return generateBTCTransactionURL(convertInfo[transactionNames[selectedAsset]]);
  }
  if (convertInfo[selectedAsset].network === 'ethereum') {
    return generateETHTransactionURL(convertInfo[transactionNames[selectedAsset]]);
  }
  if (convertInfo[selectedAsset].network === 'solana') {
    return generateSolanaTransactionURL(convertInfo[transactionNames[selectedAsset]]);
  }
  throw new Error(`${selectedAsset} network is not handled!`);
}

const TxLinkGenerator = ({ tx, url }) => {
  if (tx === '' || !tx) {
    return '-';
  }
  return (
    <CExternalLink
      href={url}
      content={minimizeAddress(tx.toLowerCase(), 8)}
    />
  );
};

export default TxLinkGenerator;
