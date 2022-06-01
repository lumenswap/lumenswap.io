import { useSelector } from 'react-redux';
import humanizeAmount from 'helpers/humanizeAmount';
import { isSameAsset, getAssetDetails } from 'helpers/asset';
import LSP from 'tokens/LSP';
import jsxThemeColors from 'helpers/jsxThemeColors';
import styles from './style.module.scss';

const AssetBox = ({ color, asset }) => {
  const isLogged = useSelector((state) => state.user.logged);
  const userAssetBalance = useSelector((state) => state.userBalance)
    .find((balance) => isSameAsset(getAssetDetails(balance.asset), getAssetDetails(asset ?? LSP)));

  if (!isLogged) return null;

  return (
    <p className={styles.lsp} style={{ color: color ?? jsxThemeColors.blueRibbon, border: `1px solid ${color ?? jsxThemeColors.blueRibbon}` }}>
      {humanizeAmount(userAssetBalance?.balance || 0)} {asset?.code ?? 'LSP'}
    </p>
  );
};

export default AssetBox;
