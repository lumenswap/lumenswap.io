import CExternalLink from 'components/CExternalLink';
import { generateTransactionURL } from 'helpers/explorerURLGenerator';
import minimizeAddress from 'helpers/minimizeAddress';

const TxLinkGenerator = ({ tx }) => {
  if (tx === '' || !tx) {
    return <>-</>;
  }
  return (
    <CExternalLink
      href={generateTransactionURL(tx)}
      content={minimizeAddress(tx.toLowerCase(), 8)}
    />
  );
};

export default TxLinkGenerator;
