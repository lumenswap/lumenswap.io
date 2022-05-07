import CExternalLink from 'components/CExternalLink';
import {
  generateBTCTransactionURL, generateETHTransactionURL,
  generateSolanaTransactionURL, generateTransactionURL,
} from 'helpers/explorerURLGenerator';
import minimizeAddress from 'helpers/minimizeAddress';

export function generateBridgeTransactionURL(tx, network) {
  if (network === 'stellar') {
    return generateTransactionURL(tx);
  }
  if (network === 'bitcoin') {
    return generateBTCTransactionURL(tx);
  }
  if (network === 'ethereum') {
    return generateETHTransactionURL(tx);
  }
  if (network === 'solana') {
    return generateSolanaTransactionURL(tx);
  }
  throw new Error(`${network} network is not handled!`);
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
