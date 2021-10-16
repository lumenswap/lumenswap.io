import { useSelector } from 'react-redux';
import numeral from 'numeral';
import sevenDigit from 'helpers/sevenDigit';
import isSameAsset from 'helpers/isSameAsset';
import getAssetDetails from 'helpers/getAssetDetails';
import LSP from 'tokens/LSP';
import styles from './style.module.scss';

const LSPBox = () => {
  const isLogged = useSelector((state) => state.user.logged);
  const userLSPBalance = useSelector((state) => state.userBalance)
    .find((balance) => isSameAsset(getAssetDetails(balance.asset), getAssetDetails(LSP)));

  if (!isLogged) return null;

  return (
    <p className={styles.lsp}>
      {numeral(sevenDigit(userLSPBalance?.balance || 0)).format('0,0.[0000000]')} LSP

    </p>
  );
};

export default LSPBox;
