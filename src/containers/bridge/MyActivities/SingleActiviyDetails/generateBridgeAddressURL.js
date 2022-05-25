import {
  generateAddressURL,
  generateBTCAddressURL, generateETHAddressURL,
  generateSolanaAddressURL,
} from 'helpers/explorerURLGenerator';

function generateBridgeAddressURL(address, network) {
  if (network === 'stellar') {
    return generateAddressURL(address);
  }
  if (network === 'solana') {
    return generateSolanaAddressURL(address);
  }
  if (network === 'bitcoin') {
    return generateBTCAddressURL(address);
  }
  if (network === 'ethereum') {
    return generateETHAddressURL(address);
  }
  throw new Error(`${network} is not handled !`);
}

export default generateBridgeAddressURL;
