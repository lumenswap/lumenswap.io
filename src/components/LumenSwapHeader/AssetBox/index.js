import { useSelector } from 'react-redux';
import humanAmount from 'helpers/humanAmount';
import { isSameAsset, getAssetDetails } from 'helpers/asset';
import LSP from 'tokens/LSP';
import styles from './style.module.scss';

const AssetBox = ({ color, asset }) => {
  const isLogged = useSelector((state) => state.user.logged);
  const userAssetBalance = useSelector((state) => state.userBalance)
    .find((balance) => isSameAsset(getAssetDetails(balance.asset), getAssetDetails(asset ?? LSP)));

  if (!isLogged) return null;

  return (
    <p className={styles.lsp} style={{ color: color ?? '#0e41f5', border: `1px solid ${color ?? '#0e41f5'}` }}>
      {humanAmount(userAssetBalance?.balance || 0)} {asset?.code ?? 'LSP'}
    </p>
  );
};

export default AssetBox;
